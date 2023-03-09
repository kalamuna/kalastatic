// This script would exist within the node module and doesn't need to be invoked during a real project
import {
  promises as fs
} from 'fs';
import Twig from "twig";

import {
  addDrupalExtensions
} from 'drupal-twig-extensions/twig';

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
  console.log(`Compiling Twig File: ${twigFile}`);

  const twigFileStream = await fs.readFile(`${twigFile}`, { encoding: 'utf8' });

  const compiledTwig = Twig.twig({
    data: twigFileStream,
    allowInlineIncludes: true,
    path: directory,
    namespaces: config.kalastatic.namespaces,
  }).render(renderData);

  return compiledTwig;
};

// Writes HTML to a given location
export const writeHtml = async (path, html) => {
  console.log(`Writing ${path}`);

  const pathPieces = path.split("/");
  pathPieces.pop();

  await fs.mkdir(pathPieces.join("/"), { recursive: true });
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

// Executes the other functions of Kstat
export const kstat = async () => {

  // TODO: Delete all the destination files/directories in each source and assets so we don't get orphans.

  // Get the list of files in each namespace so they will be availble when rendering pages.
  const renderData = {};
  if (config.kalastatic.namespaces) {
    const namespaceFiles = await getNamespaceFiles(config.kalastatic.namespaces);
    renderData.namespaceFiles = namespaceFiles;
  }

  // Process each source into its corresponding destination.
  for (const source in config.kalastatic.sources) {
    const destination = config.kalastatic.sources[source];
    const pages = await findTwigPages(source);
    for (const page of pages) {
      const compiledHtml = await compileTwig(source, page, renderData).catch(err => console.log(err.message));
      writeHtml(`${destination}/${page.replace(`${source}/`, "").replace(".twig", "")}`, compiledHtml);
    }
  }

  // Move the assets to the proper directory.
  for (const source in config.kalastatic.assets) {
    await moveFiles(source, config.kalastatic.assets[source]);
  }
};
