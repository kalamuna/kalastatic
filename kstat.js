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

// Returns an array of objects containing files in the component directory and a path to where they live
const getFilesForTwig = async (directory) => {
  let resultFiles = [];

  await fs.readdir(`${directory}`)
    .then(async (files) => {
      for (const file of files) {
        await fs.stat(`${directory}/${file}`)
          .then(async (entry) => {
            if (entry.isDirectory()) {
              const files = await getFilesForTwig(`${directory}/${file}`);
              for (const file of files) {
                resultFiles.push({ "name": file.name, "path": file.path });
              }
            } else {
              resultFiles.push({ "name": file, "path": `${directory}/${file}` });
            }
          })
      }
    });

  return resultFiles;
};

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
              await fs.mkdir(`${targetDirectory}/${directory}/`, { recursive: true });
              fs.copyFile(`${directory}/${file}`, `${targetDirectory}/${directory}/${file}`);
            }
          })
      }
    });
};

// Executes the other functions of Kstat
export const kstat = async () => {
  const directory = config.kalastatic.pages_directory;
  const pages = await findTwigPages(directory);

  const componentFiles = await getFilesForTwig(config.kalastatic.namespaces.components);

  const renderData = { "component_files": componentFiles };

  for (const page of pages) {
    const compiledHtml = await compileTwig(directory, page, renderData).catch(err => console.log(err.message));

    writeHtml(`build/${page.replace(`${directory}/`, "").replace(".twig", "")}`, compiledHtml);
  }

  await moveFiles(config.kalastatic.assets_directory, config.kalastatic.build_directory);
};
