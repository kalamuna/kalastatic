'use strict'
var assert = require('assert')
var path = require('path')
var kss = require('kss/lib/cli')
var Metalsmith = require('metalsmith')
var extend = require('extend-shallow')

function KalaStatic(nconf) {

  // Make sure there is an nconf configuration.
  assert(nconf, 'An nconf configuration is required.')

  // Set the default values.
  nconf.defaults({
    base: '.',
    source: 'src',
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
  })

  // Set the properties of the object.
  this.nconf = nconf
}

KalaStatic.prototype.build = function () {
  var self = this
  return new Promise(function (resolve, reject) {
    // Create the environment.
    var config = self.nconf
    var base = config.get('base')
    var kssConf = config.get('kss')
    var plugins = config.get('plugins')
    var pluginDefaults = config.get('pluginDefaults')
    var pluginOpts = config.get('pluginOpts')
    var options = extend(pluginDefaults, pluginOpts)

    var metalsmith = new Metalsmith(base)

    var source = config.get('source');
    // Set up Metalsmith.
    metalsmith.source(source)
    metalsmith.destination(config.get('destination'))

    // Set the initial metadata.
    metalsmith.metadata({
      // TODO: Move this to JSTransformer Engine Options.
      namespaces: {
        kalastatic: path.join(base, source)
      }
    })

    // Plugins.
    for (var i in plugins) {
      if (plugins[i]) {
        var name = plugins[i]
        var mod = require(name)
        var opts = options[name] || {}
        metalsmith.use(mod(opts))
      }
    }

    // Build the application.
    metalsmith.build(function (err) {

      if (err) {
        return reject(err)
      }

      if( !kssConf ) {
        // if there are no styles, lets not force things…
        // msybe they aren't using the styleguide
        return resolve();
      }

      // Check if we're to build the KSS Config.
      var argv = ['kss']

      if (kssConf.config) {

        // Use KSS's config file.
        argv.push('--config=' + kssConf.config)

      } else {

        // If none specified, find the default KSS Twig builder.
        if (!kssConf.builder) {
          kssConf.builder = config.get('builder')
          kssConf.builder = require.resolve('kss')
          kssConf.builder = path.dirname(kssConf.builder)
          kssConf.builder = path.join(kssConf.builder, 'builder', 'twig')
        }

        if( config.destination == "build" ) {
          config.destination = path.join(base, config.destination)
        }

        // Build the KSS arguments.
        argv.push(
          // Make sure we log everything.
          '--verbose',
          // Add KalaStatic's src directory, so that there is a good base.
          '--destination=' + kssConf.destination,
          // Choose the Twig builder.
          '--builder=' + kssConf.builder,
          // Add the Twig Namespace.
          '--namespace=' + 'kalastatic:' + path.join(base, source)
        )

        if (kssConf.title) {
          argv.push('--title=' + kssConf.title)
        }

        if (kssConf.homepage) {
          argv.push('--homepage=' + kssConf.homepage)
        }

        if( typeof kssConf.css === 'string' ) {
          kssConf.css = [ kssConf.css ]
        }

        if( typeof kssConf.js === 'string' ) {
          kssConf.js = [ kssConf.js ]
        }

        if( typeof kssConf.source === 'string' ) {
          kssConf.source = [ kssConf.source ]
        }

        for (var dirIndex in kssConf.css) {
          if (kssConf.css[dirIndex]) {
            argv.push('--css=' + kssConf.css[dirIndex])
          }
        }

        for (var dirIndex in kssConf.source) {
          if (kssConf.source[dirIndex]) {
            argv.push('--source=' + kssConf.source[dirIndex])
          }
        }

        for (var dirIndex in kssConf.js) {
          if (kssConf.js[dirIndex]) {
          argv.push('--js=' + kssConf.js[dirIndex])
          }
        }
      }

      console.log( argv )
      // Now that it's complete, run KSS on it.
      kss({
        stdout: process.stdout,
        stderr: reject,
        argv: argv
      }).then(resolve).catch(reject)
    })
  })
}

module.exports = KalaStatic
