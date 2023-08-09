#!/usr/bin/env node
/**
 * @file bin/kalastatic
 *
 * This file will load up the kalastatic API, and run it against the current working directory.
 */

import meow from 'meow';
import { readFileSync } from 'fs';
import { kstat } from "../src/kalastatic.js";

const cli = meow(`
	Usage
	  $ kalastatic <directory>

	Examples
	  $ kalastatic path/to/prototype
`, {
	importMeta: import.meta
});

const directory = cli.input[0] ?? '.';

if (directory != '.') {
  process.chdir(directory);
}

const pkg = readFileSync('package.json', 'utf8');
const config = JSON.parse(pkg);
kstat(config.kalastatic);
