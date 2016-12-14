'use strict'

var assert = require('assert')
var path = require('path')
var kss = require('kss/lib/cli')
var forEach = require('for-each')
var Metalsmith = require('metalsmith')
var extend = require('extend-shallow')

function KalaStatic(nconf) {
  // Make sure there is an nconf configuration.
  assert(nconf, 'An nconf configuration is required.');

  // Set the default values.
  nconf.defaults({
    base: '.',
    source: 'src',
    kssSource: [],
    destination: 'build',
    css: '../main.css',
    plugins: [
      // Load information from the environment variables.
      'metalsmith-env',
      // Add base, dir, ext, name, and href info to each file.
      'metalsmith-paths',
      // Load metadata info the metalsmith metadata object.
      'metalsmith-metadata-convention',
      // Concatenate any needed files.
      'metalsmith-concat-convention',
      // Load all collections.
      'metalsmith-collections-convention',
      // Bring in static assets.
      'metalsmith-assets-convention',
      // Ignore all partials and layouts.
      'metalsmith-ignore',
      // Load all Partials.
      'metalsmith-jstransformer-partials',
      // Render all content with JSTransformers.
      'metalsmith-jstransformer'
    ],
    pluginDefaults: {
      // Ignore all partials and layouts.
      'metalsmith-ignore': '**/_*'
    },
    pluginOpts: {}
  });

  // Set the properties of the object.
  this.nconf = nconf;
}

KalaStatic.prototype.build = function () {
  var self = this;
  return new Promise(function (resolve, reject) {
    // Create the environment.
    var base = self.nconf.get('base');
    var kssHomepage = self.nconf.get('kssHomepage');
    var kssTitle = self.nconf.get('kssTitle');
    var metalsmith = new Metalsmith(base);
    var plugins = self.nconf.get('plugins')
    var pluginDefaults = self.nconf.get('pluginDefaults')
    var pluginOpts = self.nconf.get('pluginOpts')
    var options = extend(pluginDefaults, pluginOpts)

    // Plugins.
    for (var i in plugins) {
      var name = plugins[i]
      var mod = require(name)
      var opts = options[name] || {}
      metalsmith.use(mod(opts))
    }

    // Retrieve configuration for the application.
    var source = self.nconf.get('source');
    var dest = self.nconf.get('destination');
    var css = self.nconf.get('css');
    var kssSource = self.nconf.get('kssSource')

    // Set up Metalsmith.
    metalsmith.source(source);
    metalsmith.destination(dest);

    // Build the application.
    metalsmith.build(function (err) {
      if (err) {
        reject(err);
      } else {
        // Find the KSS Twig builder.
        var kssBuilder = self.nconf.get('builder')
        if (!kssBuilder) {
          kssBuilder = require.resolve('kss')
          kssBuilder = path.dirname(kssBuilder)
          kssBuilder = path.join(kssBuilder, 'builder', 'twig')
        }
        var argv = [
          'kss',
          // Make sure we log everything.
          '--verbose',
          // Add KalaStatic's src directory, so that there is a good base.
          '--source=' + path.resolve(__dirname),
          // Scan the application directory.
          '--source=' + path.join(base, source),
          // Write to the build directory.
          '--destination=' + path.join(base, dest, 'styleguide'),
          // Choose the Twig builder.
          '--builder=' + kssBuilder,
          // Load main.css
          '--css=' + css
        ]
        if (kssTitle) {
          argv.push('--title=' + kssTitle)
        }
        if (kssHomepage) {
          argv.push('--homepage=' + kssHomepage)
        }
        for (var dirIndex in kssSource) {
          argv.push('--source=' + kssSource[dirIndex])
        }

        // Now that it's complete, run KSS on it.
        kss({
          stdout: process.stdout,
          stderr: reject,
          argv: argv
        }).then(resolve).catch(reject);
      }
    });
  });
};

module.exports = KalaStatic;
