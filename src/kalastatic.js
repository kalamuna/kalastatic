// This script would exist within the node module and doesn't need to be invoked during a real project
import {
  promises as fs,
} from 'fs';
import { extname, basename, dirname } from 'path';
import Twig from "twig";

import {
  addDrupalExtensions
} from 'drupal-twig-extensions/twig';

import * as sass from 'sass';
import { promisify } from "util";
const sassRenderPromise = promisify(sass.render);
let namespaceFiles = [];

addDrupalExtensions(Twig);

// Finds twig pages in a directory and returns an array of filenames
export const findTwigPages = async (directory) => {
  let twigFiles = [];

  await fs.readdir(`${directory}`)
    .then(async (files) => {
      for (const file of files) {
        await fs.stat(`${directory}/${file}`)
          .then(async (entry) => {
            if (entry.isDirectory()) {
              const pages = await findTwigPages(`${directory}/${file}`);
              for (const page of pages) {
                twigFiles.push(page);
              }
            } else if (file.endsWith('.html.twig')) {
              twigFiles.push(`${directory}/${file}`);
            }
          });
      }
    });

  return twigFiles;
};

// Returns an array of namespaces with an array of files in each.
const getNamespaceFiles = async (namespaces) => {
  let namespaceFiles = [];
  for (const namespace in namespaces) {
    namespaceFiles[namespace] = [];
    // Get the files in the namespace directory.
    const files = await getDirectoryFiles(`${namespaces[namespace]}`);
    // Add the namespace to the beginning of the filenames.
    for (const file of files) {
      namespaceFiles[namespace].push(`@${namespace}/${file}`);
    }
  };
  // Sort the resulting files so that periods are sorted above hyphens.
  for (const namespace in namespaces) {
    namespaceFiles[namespace] = namespaceFiles[namespace].sort(function(a, b) {
      return a.replace('.', ' ') > b.replace('.', ' ') ? 1 : -1;
    });
  }
  return namespaceFiles;
};

// Recursively get the files in a directory, omitting the root directory of the namespace from the resulting path.
const getDirectoryFiles = async (rootDirectory, subDirectory = false) => {
  // If there is a subdirectory, combine it with the root directory to get the directory we are looking at.
  const directory = subDirectory ? `${rootDirectory}/${subDirectory}` : rootDirectory;
  let resultFiles = [];
  // Read all the files in the directory and then iterate over each one.
  await fs.readdir(`${directory}`).then(async (files) => {
    for (const file of files) {
      // Go through each file, and check if it is a subdirectory.
      await fs.stat(`${directory}/${file}`).then(async (entry) => {
        if (entry.isDirectory()) {
          // If this is a directory, recursively get the contents of taht.
          const files = await getDirectoryFiles(`${directory}`, file);
          // If we are looking through a subdirectoy, prepend that to the file path.
          for (const file of files) {
            resultFiles.push(subDirectory ? `${subDirectory}/${file}` : file);
          }
        } else {
          // If this is a non-directory file, append it to the list, with the subdirectory appended if needed.
          resultFiles.push(subDirectory ? `${subDirectory}/${file}` : file);
        }
      })
    }
  });
  return resultFiles;
}

// Compiles a twig file and returns HTML
export const compileTwig = async (directory, twigFile, renderData, config) => {

  // Tell the user we are compiling twig, and then set the console to red in case there are errors.
  console.log(`Compiling Twig File: ${twigFile}\x1b[31m`);

  const twigFileStream = await fs.readFile(`${twigFile}`, { encoding: 'utf8' });

  const compiledTwig = Twig.twig({
    data: twigFileStream,
    allowInlineIncludes: true,
    path: directory,
    namespaces: config.namespaces,
  }).render(renderData);

  // Set the console back to no color.
  console.log(`\x1b[0m`);

  return compiledTwig;
};

// Writes HTML to a given location
export const writeHtml = async (path, html) => {
  console.log(`Writing ${path}\n`);
  await createDestinationDir(path);
  fs.writeFile(path, html);
};

export const moveFiles = async (directory, targetDirectory) => {
  await fs.readdir(`${directory}`)
    .then(async (files) => {
      for (const file of files) {
        await fs.stat(`${directory}/${file}`)
          .then(async (entry) => {
            if (entry.isDirectory()) {
              await moveFiles(`${directory}/${file}`, targetDirectory);
            } else {
              await fs.mkdir(`${targetDirectory}/`, { recursive: true });
              fs.copyFile(`${directory}/${file}`, `${targetDirectory}/${file}`);
            }
          })
      }
    });
};

// Delete the destination directories associated with a list of sources.
export const clearDestination = async (directory) => {
  console.log(`Clearing destination directory: ${directory}\n`);
  await fs.rm(directory, { recursive: true, force: true });
};

// Compile scss source files into destination css.
export const compileCSS = async (source, destination) => {
  console.log(`Compiling ${source} to ${destination}.\n`);
  await createDestinationDir(destination);
  const styleResult = await sassRenderPromise({
    file: source,
    outFile: destination,
    sourceMap: true,
    sourceMapContents: true
  });
  await fs.writeFile(destination, styleResult.css, "utf8");
  await fs.writeFile(`${destination}.map`, styleResult.map, "utf8");
};

// Make sure the destination directory exists for a file.
export const createDestinationDir = (destination) => {
  let directory = dirname(destination)
  if (directory) {
    return fs.mkdir(directory, {
      recursive: true
    });
  }
}

/**
 * Adds our own attach_library() function to Twig.
 *
 * @param renderData The render data variables passed to Twig.
 */
function addTwigAttachLibrary(renderData, config) {
  // Set up the attach_library Twig function
  Twig.functions.attach_library = function(library) {
    // Check if libraries are defined.
    if (!config.libraries) {
      console.error(`kalastatic: Called attach_library('${library}'), but no libraries are defined. Add the library definitions to package.json's kalastatic.libraries configuration. See https://kalamuna.github.io/kstat_test/kalastatic-functions-filters/#attach-library`);
      return;
    }

    // Check if the desired library is defined.
    if (!Object.hasOwn(config.libraries, library)) {
      console.error(`kalastatic: Called attach_library('${library}'), but the library is not defined. Add it to package.json's kalastatic.libraries configuration. See https://kalamuna.github.io/kstat_test/kalastatic-functions-filters/#attach-library`);
      return;
    }

    // Add any associated sylesheets
    for (const source in config.libraries[library].stylesheets) {
      const filename = config.libraries[library].stylesheets[source];
      if (!renderData.stylesheet_files.includes(filename)) {
        renderData.stylesheet_files.push(filename);
        renderData.stylesheets[0] += "<link href=\"" + renderData.base_url + "/" + filename + "\" rel=\"stylesheet\">";
      }
      else {
        console.error(`kalastatic: Library stylesheet file missing: ${library} ${source} expects "${filename}"`);
      }
    }

    // Add any associated scripts
    for (const source in config.libraries[library].scripts) {
      const filename = config.libraries[library].scripts[source];
      if (!renderData.script_files.includes(filename)) {
        renderData.script_files.push(filename);
        renderData.scripts[0] += "<script src=\"" + renderData.base_url + "/" + filename + "\" ></script>";
      }
      else {
        console.error(`kalastatic: Library JavaScript file missing: ${library} ${source} expects "${filename}"`);
      }
    }
  };

  // Get the list of namespaces from the configuration.
  Twig.functions.get_namespaces = function() {
    return Object.keys(config.namespaces);
  }
  // Get the files within the directory of a twig namespace.
  Twig.functions.get_namespace_files = function(namespace) {
    return namespaceFiles[namespace];
  };
}

// Executes the other functions of Kstat
export const kstat = async (config) => {
  const renderData = {};

  // Add the base url if set by the environmetn and / otherwise.
  renderData.base_url = process.env.base_url || "";

  // Delete all the destination files/directories in each source and assets so we don't get orphans.
  await clearDestination(config.destination);

  // Compile the SCSS into CSS.
  renderData.stylesheet_files = []; // Stores which stylesheets have already been added.
  renderData.stylesheets = [""]; // Stores the concatinated link tags, with the string in an array to solve the hoisting issue.
  for (const source in config.stylesheets) {
    let destination = config.destination + '/' + config.stylesheets[source];
    await compileCSS(source, destination);
    renderData.stylesheet_files.push(config.stylesheets[source]);
    renderData.stylesheets[0] += "<link href=\"" + renderData.base_url + "/" + config.stylesheets[source] + "\" rel=\"stylesheet\">";
  }

  // Move the scripts to the proper directories.
  renderData.script_files = []; // Stores which scripts have already been added.
  renderData.scripts = [""]; // Stores the concatinated script tags, with the string in an array to solve the hoisting issue.
  for (const source in config.scripts) {
    let destination = config.destination + '/' + config.scripts[source];
    await createDestinationDir(destination);
    fs.copyFile(source, destination);
    renderData.script_files.push(config.scripts[source]);
    renderData.scripts[0] += "<script src=\"" + renderData.base_url + "/" + config.scripts[source] + "\" ></script>";
  }

  // Process all the stylesheets and scripts that have been specified by libraries.
  for (const library in config.libraries) {
    for (const source in config.libraries[library].stylesheets) {
      let destination = config.destination + '/' + config.libraries[library].stylesheets[source];
      await compileCSS(source, destination);
    }
    for (const source in config.libraries[library].scripts) {
      let destination = config.destination + '/' + config.libraries[library].scripts[source];
      await createDestinationDir(destination);
      fs.copyFile(source, destination);
    }
  }

  // Attatch our attach_library twig function so it will be avialable in twig.
  addTwigAttachLibrary(renderData, config);

  // Populate the list of namespace files so they are available for the get_namespace_files() function.
  if (config.namespaces) {
    namespaceFiles = await getNamespaceFiles(config.namespaces);
  }

  // Process each source into its corresponding destination.
  const source = config.source
  const destination = config.destination;
  const pages = await findTwigPages(config.source);
  for (const page of pages) {
    const compiledHtml = await compileTwig(source, page, renderData, config).catch(err => console.log(err.message));

    // Find the correct output filename.
    let destinationFilename = page
      .replace(`${source}/`, '')
      .replace('.twig', '');
    if (extname(destinationFilename) == '.html' && basename(destinationFilename, '.html') != 'index') {
      destinationFilename = destinationFilename.replace(basename(destinationFilename), basename(destinationFilename, '.html') + '/index.html');
    }

    // Write the file.
    writeHtml(`${destination}/${destinationFilename}`, compiledHtml);
  }

  // Move the assets to the proper directory.
  for (const source in config.assets) {
    await moveFiles(source, config.destination + '/' + config.assets[source]);
  }
};
