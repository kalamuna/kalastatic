// Dependencies
const assertDir = require('assert-dir-equal');
const path = require('path');

// Get the current directory
const directory = path.dirname(__filename);

// Assert that the build directory matches what's expected
assertDir(path.join(directory, 'build_directory'), path.join(directory, 'expected'));

// Output test result
console.log("Tests passed!");
