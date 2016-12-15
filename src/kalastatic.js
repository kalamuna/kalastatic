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
    kss: {
      source: [
        'src',
      ],
      destination: 'build',
      css: '../main.css',
      homepage: 'homepage.md'
    },
    destination: 'build',
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
    var config = self.nconf;
    var base = config.get('base');
    var kssConf = config.get('kss');
    var metalsmith = new Metalsmith(base);
    var plugins = config.get('plugins')
    var pluginDefaults = config.get('pluginDefaults')
    var pluginOpts = config.get('pluginOpts')
    var options = extend(pluginDefaults, pluginOpts)

    // Plugins.
    for (var i in plugins) {
      var name = plugins[i]
      var mod = require(name)
      var opts = options[name] || {}
      metalsmith.use(mod(opts))
    }

    // Retrieve configuration for the application.
    var source = config.get('source');
    var dest = kssConf.destination;
    var css = kssConf.css;

    // Set up Metalsmith.
    metalsmith.source(source);
    metalsmith.destination(dest);

    // Build the application.
    metalsmith.build(function (err) {

      if (err) {

        reject(err);

      } else if( !kssConf.config ){

        // If none specified, find the default KSS Twig builder.
        if( !kssConf.builder ) {
          kssConf.builder = self.nconf.get('builder')
          kssConf.builder = require.resolve('kss')
          kssConf.builder = path.dirname(kssConf.builder)
          kssConf.builder = path.join(kssConf.builder, 'builder', 'twig')
        }

        console.log("» css »»»", css);

        var argv = [
          'kss',
          // Make sure we log everything.
          '--verbose',
          // Add KalaStatic's src directory, so that there is a good base.
          '--source=' + path.resolve(__dirname),
          // Write to the build directory.
          '--destination=' + path.join(base, dest, 'styleguide'),
          // Choose the Twig builder.
          '--builder=' + kssConf.builder,
          // Load main.css
          '--css=' + css,
        ]

        if (kssConf.title) {
          argv.push('--title=' + kssConf.title)
        }

        if (kssConf.homepage) {
          argv.push('--homepage=' + kssConf.homepage)
        }

        for (var dirIndex in kssConf.source) {
          argv.push('--source=' + path.join(base, kssConf.source[dirIndex]))
        }

        console.log('argv', argv);

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
