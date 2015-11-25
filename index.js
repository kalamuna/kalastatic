var assert = require('assert');
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
      // Render all layouts with JSTransformers.
      'metalsmith-jstransformer-layouts': {},
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
    var metalsmith = new Metalsmith(self.nconf.get('base'));

    // Plugins.
    forEach(self.nconf.get('plugins'), function (opts, name) {
      var mod = require(name);
      metalsmith.use(mod(opts));
    });

    metalsmith.source(self.nconf.get('source'));
    metalsmith.destination(self.nconf.get('destination'));
    metalsmith.build(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = KalaStatic;
