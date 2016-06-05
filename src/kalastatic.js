var assert = require('assert');
var path = require('path');
var kss = require('kss/lib/cli');
var forEach = require('for-each');
var Metalsmith = require('metalsmith');

function KalaStatic(nconf) {
  // Make sure there is an nconf configuration.
  assert(nconf, 'An nconf configuration is required.');

  // Set the default values.
  nconf.defaults({
    base: '.',
    source: 'src',
    destination: 'build',
    plugins: {
      // Load information from the environment variables.
      'metalsmith-env': {},
      // Add base, dir, ext, name, and href info to each file.
      'metalsmith-paths': {},
      // Load metadata info the metalsmith metadata object.
      'metalsmith-metadata-convention': {},
      // Concatenate any needed files.
      'metalsmith-concat-convention': {},
      // Load all collections.
      'metalsmith-collections-convention': {},
      // Load all Partials.
      'metalsmith-jstransformer-partials': {},
      // Render all content with JSTransformers.
      'metalsmith-jstransformer': {},
      // Ignore all partials and layouts.
      'metalsmith-ignore': '**/_*'
    }
  });

  // Set the properties of the object.
  this.nconf = nconf;
}

KalaStatic.prototype.build = function () {
  var self = this;
  return new Promise(function (resolve, reject) {
    // Create the environment.
    var base = self.nconf.get('base');
    var metalsmith = new Metalsmith(base);

    // Plugins.
    forEach(self.nconf.get('plugins'), function (opts, name) {
      var mod = require(name);
      metalsmith.use(mod(opts));
    });

    // Retrieve configuration for the application.
    var source = self.nconf.get('source');
    var dest = self.nconf.get('destination');

    // Set up Metalsmith.
    metalsmith.source(source);
    metalsmith.destination(dest);

    // Build the application.
    metalsmith.build(function (err) {
      if (err) {
        reject(err);
      } else {
        // Now that it's complete, run KSS on it.
        kss({
          stdout: process.stdout,
          stderr: process.stderr,
          argv: [
            'kss',
            // Make sure we log everything.
            '--verbose',
            // Add KalaStatic's src directory, so that there is a good base.
            '--source=' + path.resolve(__dirname),
            // Scan the application directory.
            '--source=' + path.join(base, source),
            // Write to the build directory.
            '--destination=' + path.join(base, dest, 'styleguide')
          ]
        }).then(resolve).catch(reject);
      }
    });
  });
};

module.exports = KalaStatic;
