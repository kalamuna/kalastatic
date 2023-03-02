// This script would exist within the node module and doesn't need to be invoked during a real project
import {
  promises as fs
} from 'fs';
import { kstat } from "./kstat.js";

const config = JSON.parse(await fs.readFile('./package.json'));

kstat(config.kalastatic.pages_directory);
