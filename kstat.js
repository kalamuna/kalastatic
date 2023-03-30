// This script would exist within the node module and doesn't need to be invoked during a real project
import {
  promises as fs
} from 'fs';
import Twig from "twig";

import {
  addDrupalExtensions
} from 'drupal-twig-extensions/twig';

import sass from "sass";
import { promisify } from "util";
const sassRenderPromise = promisify(sass.render);

const config = JSON.parse(await fs.readFile('./package.json'));

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
            } else if (file.endsWith('.twig')) {
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
export const compileTwig = async (directory, twigFile, renderData) => {

  // Tell the user we are compiling twig, and then set the console to red in case there are errors.
  console.log(`Compiling Twig File: ${twigFile}\x1b[31m`);

  const twigFileStream = await fs.readFile(`${twigFile}`, { encoding: 'utf8' });

  const compiledTwig = Twig.twig({
    data: twigFileStream,
    allowInlineIncludes: true,
    path: directory,
    namespaces: config.kalastatic.namespaces,
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
  // Ensure the destination directory is created.
  const pathPieces = destination.split("/");
  pathPieces.pop();
  fs.mkdir(pathPieces.join("/"), { recursive: true });
}

/**
 * Adds our own attach_library() function to Twig.
 *
 * @param renderData The render data variables passed to Twig.
 */
function addTwigAttachLibrary(renderData) {
  // Set up the attach_library Twig function
  Twig.functions.attach_library = function(library) {
    for (const source in config.kalastatic.libraries[library].stylesheets) {
      const filename = config.kalastatic.libraries[library].stylesheets[source];
      if (!renderData.stylesheets.includes(filename)) {
        renderData.stylesheets.push(filename);
      }
    }
    for (const source in config.kalastatic.libraries[library].scripts) {
      const filename = config.kalastatic.libraries[library].scripts[source];
      if (!renderData.scripts.includes(filename)) {
        renderData.scripts.push(filename);
      }
    }
  }
}


// Executes the other functions of Kstat
export const kstat = async () => {
  const renderData = {};

  // Delete all the destination files/directories in each source and assets so we don't get orphans.
  await clearDestination(config.kalastatic.destination);

  // Compile the SCSS into CSS.
  renderData.stylesheets = [];
  for (const source in config.kalastatic.stylesheets) {
    let destination = config.kalastatic.destination + '/' + config.kalastatic.stylesheets[source];
    await compileCSS(source, destination);
    renderData.stylesheets.push(config.kalastatic.stylesheets[source]);
  }

  // Move the scripts to the proper directories.
  renderData.scripts = [];
  for (const source in config.kalastatic.scripts) {
    let destination = config.kalastatic.destination + '/' + config.kalastatic.scripts[source];
    await createDestinationDir(destination);
    fs.copyFile(source, destination);
    renderData.scripts.push(config.kalastatic.scripts[source]);
  }

  // Process all the stylesheets and scripts that have been specified by libraries.
  for (const library in config.kalastatic.libraries) {
    for (const source in config.kalastatic.libraries[library].stylesheets) {
      let destination = config.kalastatic.destination + '/' + config.kalastatic.libraries[library].stylesheets[source];
      await compileCSS(source, destination);
    }
    for (const source in config.kalastatic.libraries[library].scripts) {
      let destination = config.kalastatic.destination + '/' + config.kalastatic.libraries[library].scripts[source];
      await createDestinationDir(destination);
      fs.copyFile(source, destination);
    }
  }

  // Attatch our attach_library twig function so it will be avialable in twig.
  addTwigAttachLibrary(renderData);

  // Get the list of files in each namespace so they will be availble when rendering pages.
  if (config.kalastatic.namespaces) {
    const namespaceFiles = await getNamespaceFiles(config.kalastatic.namespaces);
    renderData.namespaceFiles = namespaceFiles;
  }

  // Add the base url if set by the environmetn and / otherwise.
  renderData.base_url = process.env.base_url || "";

  // Process each source into its corresponding destination.
  const source = config.kalastatic.source
  const destination = config.kalastatic.destination;
  const pages = await findTwigPages(config.kalastatic.source);
  for (const page of pages) {
    const compiledHtml = await compileTwig(source, page, renderData).catch(err => console.log(err.message));
    writeHtml(`${destination}/${page.replace(`${source}/`, "").replace(".twig", "")}`, compiledHtml);
  }

  // Move the assets to the proper directory.
  for (const source in config.kalastatic.assets) {
    await moveFiles(source, config.kalastatic.destination + '/' + config.kalastatic.assets[source]);
  }
};
