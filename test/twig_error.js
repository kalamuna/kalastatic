// Dependencies
const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Get the current directory
const directory = path.dirname(__filename);
const destination = path.join(directory, 'twig_error_build');

// Broken Twig fixtures, keyed by the failure they trigger.
const cases = {
  syntax_error: '{% if true %}\nThis page has no endif, so Twig cannot compile it.\n',
  missing_include: "{% include 'does-not-exist.html.twig' %}\n",
};

(async () => {
  const { kstat } = await import('../src/kalastatic.js');

  for (const [name, twig] of Object.entries(cases)) {
    const source = path.join(directory, `twig_error_${name}`);
    fs.rmSync(source, { recursive: true, force: true });
    fs.mkdirSync(source, { recursive: true });
    fs.writeFileSync(path.join(source, 'index.html.twig'), twig);
    fs.rmSync(destination, { recursive: true, force: true });

    // Assert that a broken template fails the build rather than reporting success.
    let threw = false;
    try {
      await kstat({ source, destination });
    } catch (error) {
      threw = true;
      assert.match(error.message, /index\.html\.twig/, `Expected ${name} to report which Twig file failed.`);
    }
    assert.ok(threw, `Expected ${name} to throw rather than build successfully.`);
    assert.ok(!fs.existsSync(path.join(destination, 'index.html')), `Expected ${name} to write no HTML for a template that failed.`);

    fs.rmSync(source, { recursive: true, force: true });
  }
  fs.rmSync(destination, { recursive: true, force: true });

  // Output test result
  console.log("Tests passed!");
})();
