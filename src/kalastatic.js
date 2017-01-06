'use strict'
var assert = require('assert')
var path = require('path')
var kss = require('kss/lib/cli')
var Metalsmith = require('metalsmith')
var extend = require('extend')

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
      // Define any global variables.
      'metalsmith-define',
      // Add .json metadata to each file.
      'metalsmith-metadata-files',
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
    var metalsmith = new Metalsmith(base)
    var source = config.get('source')
    var destination = config.get('destination')

    // Retrieve the Plugin configuration.
    var plugins = config.get('plugins')
    var pluginDefaults = {
      'metalsmith-define': {
        // Expose both a base_path and a build_path variables.
        'base_path': '/', // eslint-disable-line quote-props
        'build_path': '/' // eslint-disable-line quote-props
      },
      'metalsmith-jstransformer': {
        engineOptions: {
          twig: {
            namespaces: {
              kalastatic: path.join(base, source)
            }
          }
        }
      },
      'metalsmith-ignore': '**/_*'
    }
    var pluginOpts = config.get('pluginOpts')
    var options = extend(true, {}, pluginDefaults, pluginOpts)

    // Set up Metalsmith.
    metalsmith.source(source)
    metalsmith.destination(destination)

    // Load the Metalsmith Plugins.
    for (var i in plugins) {
      if (plugins[i]) {
        var name = plugins[i]
        var mod = require(name) // eslint-disable-line import/no-dynamic-require
        var opts = options[name] || {}
        metalsmith.use(mod(opts))
      }
    }

    // Build the application.
    metalsmith.build(function (err) {
      if (err) {
        return reject(err)
      }

      // Construct the default KSS options.
      var kssDefaultConf = {
        destination: 'styleguide',
        builder: path.join(path.dirname(require.resolve('kss')), 'builder', 'twig'),
        css: '../main.css'
      }

      // Retrieve the KSS config.
      var kssConf = config.get('kss')
      if (kssConf === true) {
        kssConf = {}
      } else if (!kssConf) {
        // If we don't set a "kss: true", don't build the styleguide.
        return resolve()
      }

      // Check if we're to build the KSS Config.
      var argv = ['kss']
      if (kssConf.config) {
        // Use KSS's config file.
        argv.push('--config=' + kssConf.config)
      } else {
        // Merge in the default KSS configuration.
        kssConf = extend({}, kssDefaultConf, kssConf)

        // Build the KSS arguments.
        argv.push(
          // Make sure we log everything.
          '--verbose',
          // Add KalaStatic's src directory, so that there is a good base.
          '--destination=' + path.join(base, destination, kssConf.destination),
          // Choose the Twig builder.
          '--builder=' + kssConf.builder,
          // Add the Twig Namespace.
          '--namespace=kalastatic:' + path.join(base, source)
        )

        // Add the optional configurations.
        if (kssConf.title) {
          argv.push('--title=' + kssConf.title)
        }
        if (kssConf.homepage) {
          argv.push('--homepage=' + kssConf.homepage)
        }

        // Normalize the CSS and JavaScript sources so we can handle string or array.
        if (typeof kssConf.css === 'string') {
          kssConf.css = [kssConf.css]
        }
        if (typeof kssConf.js === 'string') {
          kssConf.js = [kssConf.js]
        }
        if (typeof kssConf.source === 'string') {
          kssConf.source = [kssConf.source]
        } else if (!kssConf.source) {
          kssConf.source = [path.join(base, source)]
        }

        // Load up the stylesheets.
        var dirIndex = 0
        for (dirIndex in kssConf.css) {
          if (kssConf.css[dirIndex]) {
            argv.push('--css=' + kssConf.css[dirIndex])
          }
        }

        // Load up the KSS sources.
        for (dirIndex in kssConf.source) {
          if (kssConf.source[dirIndex]) {
            argv.push('--source=' + kssConf.source[dirIndex])
          }
        }

        // Load up the JavaScript.
        for (dirIndex in kssConf.js) {
          if (kssConf.js[dirIndex]) {
            argv.push('--js=' + kssConf.js[dirIndex])
          }
        }
      }

      // Now that it's complete, run KSS on it.
      return kss({
        stdout: process.stdout,
        stderr: reject,
        argv: argv
      }).then(resolve).catch(reject)
    })
  })
}

module.exports = KalaStatic
