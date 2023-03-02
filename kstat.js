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
          })
      }
    });

  return twigFiles;
};

// Compiles a twig file and returns HTML
export const compileTwig = async (directory, twigFile) => {
  console.log(`Compiling Twig File: ${twigFile}`);

  const twigFileStream = await fs.readFile(`${twigFile}`, { encoding: 'utf8' });

  const compiledTwig = Twig.twig({
    data: twigFileStream,
    allowInlineIncludes: true,
    path: directory,
    namespaces: config.kalastatic.namespaces,
  }).render();

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

// Executes the other functions of Kstat
export const kstat = async (directory) => {
  const pages = await findTwigPages(directory);

  for (const page of pages) {
    const compiledHtml = await compileTwig(directory, page).catch(err => console.log(err.message));

    writeHtml(`build/${page.replace(`${directory}/`, "").replace(".twig", "")}`, compiledHtml);
  }
};
