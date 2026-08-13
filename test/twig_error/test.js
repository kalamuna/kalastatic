// Dependencies
const assert = require('assert');
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get the current directory
const directory = path.dirname(__filename);
const kalastatic = path.join(directory, '..', '..', 'bin', 'kalastatic.js');

// Build a prototype that is expected to fail, and report what happened.
const build = (prototype) => {
  const destination = path.join(directory, prototype, 'build_directory');
  fs.rmSync(destination, { recursive: true, force: true });
  const result = spawnSync(process.execPath, [kalastatic, prototype], {
    cwd: directory,
    encoding: 'utf8'
  });
  return { ...result, destination };
};

// Assert that a broken template fails the build rather than reporting success
for (const prototype of ['syntax_error', 'missing_include']) {
  const result = build(prototype);
  assert.notStrictEqual(result.status, 0, `Expected ${prototype} to exit with a failure.`);
  assert.match(result.stderr, /index\.html\.twig/, `Expected ${prototype} to report which Twig file failed.`);
  assert.ok(!fs.existsSync(path.join(result.destination, 'index.html')), `Expected ${prototype} to write no HTML for a template that failed.`);
}

// Output test result
console.log("Tests passed!");
