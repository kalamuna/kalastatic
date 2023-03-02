// This script would exist within the node module and doesn't need to be invoked during a real project
import { kstat } from "./kstat.js";

import config from "./package.json" assert { type: "json" };

kstat(config.kalastatic.pages_directory);
