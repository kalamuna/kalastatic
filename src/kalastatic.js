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
    var kssConf = self.nconf.get('kss');

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
    var source = kssConf.source;
    var dest = kssConf.destination || nconf.defaults.destination;
    var css = kssConf.css;

    var kssSource = kssConf.source;

    // Set up Metalsmith.
    metalsmith.source(source);
    metalsmith.destination(dest);

    // Build the application.
    metalsmith.build(function (err) {

      if (err) {
        reject(err);
      } else if( !kssConf.config ){

        // Find the default KSS Twig builder.
        if( !kssConf.builder ) {
          kssConf.builder = self.nconf.get('builder')
          kssConf.builder = require.resolve('kss')
          kssConf.builder = path.dirname(kssBuilder)
          kssConf.builder = path.join(kssBuilder, 'builder', 'twig')
        }

        var argv = [
          'kss',
          // Make sure we log everything.
          '--verbose',
          // Add KalaStatic's src directory, so that there is a good base.
          '--source=' + path.resolve(__dirname),
          // Scan the application directory.
          '--source=' + path.join(base, kssConf.source ),
          // Write to the build directory.
          '--destination=' + path.join(base, dest, 'styleguide'),
          // Choose the Twig builder.
          '--builder=' + kssConf.builder,
          // Load main.css
          '--css=' + css
        ]

        if (kssTitle) {
          argv.push('--title=' + kssConf.title)
        }

        if (kssHomepage) {
          argv.push('--homepage=' + kssConf.homepage)
        }
        
        for (var dirIndex in kssConf.source) {
          argv.push('--source=' + kssConf.source[dirIndex])
        }

      } else {
        // simple!
        var argv = [
          'kss',
          '--config=' + kssConf.config
        ]
      }

      // Now that it's complete, run KSS on it.
      kss({
        stdout: process.stdout,
        stderr: reject,
        argv: argv
      }).then(resolve).catch(reject);

    });
  });
};

module.exports = KalaStatic;
