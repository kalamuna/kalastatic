// This script would exist within the node module and doesn't need to be invoked during a real project

import { readFileSync } from 'fs';
import { kstat } from "./kstat.js";

const config = JSON.parse(readFileSync('./package.json'));
kstat(config);
