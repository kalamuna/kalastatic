'use strict'

const assert = require('assert')
const path = require('path')
const kss = require('kss/lib/cli')
const Metalsmith = require('metalsmith')
const extend = require('extend')

function KalaStatic(nconf) {
  // Make sure there is an nconf configuration.
  assert(nconf, 'An nconf configuration is required.')

  // Set the default values.

  nconf.defaults({
    base: '.',
    bsIndex: 'index.html',
    bsBrowser: false,
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
      // Allow ignoring files.
      'metalsmith-ignore',
      // Render all content with JSTransformers.
      'metalsmith-jstransformer',
      // Clean URLs.
      'metalsmith-clean-urls'
    ],
    pluginOpts: {}
  })

  // Set the properties of the object.
  this.nconf = nconf
}

KalaStatic.prototype.build = function () {
  const self = this
  return new Promise((resolve, reject) => {
    // Create the environment.
    const config = self.nconf
    const base = config.get('base')
    const metalsmith = new Metalsmith(base)
    const source = config.get('source')
    const destination = config.get('destination')
    // Retrieve the Plugin configuration.
    const plugins = config.get('plugins')
    const pluginDefaults = {
      'metalsmith-define': {
        // Expose both a base_path and a build_path variables.
        'base_path': '/', // eslint-disable-line quote-props
        'build_path': '/' // eslint-disable-line quote-props
      },
      'metalsmith-jstransformer': {
        engineOptions: {
          twig: {
            namespaces: {
              kalastatic: '.',
              atoms: path.join('components', 'atoms'),
              molecules: path.join('components', 'molecules'),
              organisms: path.join('components', 'organisms')
            }
          }
        }
      },
      'metalsmith-ignore': '{_*,**/_*}',
      'metalsmith-metadata-files': {
        inheritFilePrefix: '@kalastatic/'
      }
    }
    const pluginOptions = config.get('pluginOpts')
    const options = extend(true, {}, pluginDefaults, pluginOptions)
    // Prepend the base to all namespaces.
    for (const namespaceName in options['metalsmith-jstransformer'].engineOptions.twig.namespaces) {
      if (options['metalsmith-jstransformer'].engineOptions.twig.namespaces[namespaceName]) {
        options['metalsmith-jstransformer'].engineOptions.twig.namespaces[namespaceName] = path.join(base, source, options['metalsmith-jstransformer'].engineOptions.twig.namespaces[namespaceName])
      }
    }

    const cleanBuild = config.get('cleanBuild') || false

    // Set up Metalsmith.
    metalsmith.source(source)
    metalsmith.destination(destination)
    metalsmith.clean(cleanBuild)

    // Load the Metalsmith Plugins.
    for (const i in plugins) {
      if (plugins[i]) {
        const plugin = plugins[i]
        let mod = ''
        let options_ = {}
        if (typeof plugin === 'string') {
          mod = require(plugin)
          options_ = options[plugin] || {}
        } else {
          mod = plugin.plugin
          if (typeof mod === 'string') {
            mod = require(mod)
          }

          options_ = plugin.options || options[plugin.name] || {}
        }

        metalsmith.use(mod(options_))
      }
    }

    // Build the application.
    metalsmith.build(err => {
      if (err) {
        return reject(err)
      }

      // Construct the default KSS options.
      const kssDefaultConf = {
        destination: 'styleguide',
        builder: path.dirname(require.resolve('kstat-kss-builder')),
        css: '../main.css',
        homepage: 'kalastatic-kss-homepage.md',
        twig: true
      }

      // Retrieve the KSS config.
      let kssConf = config.get('kss')
      if (kssConf === true) {
        kssConf = {}
      } else if (!kssConf) {
        // If we don't set a "kss: true", don't build the styleguide.
        return resolve()
      }

      // Check if we're to build the KSS Config.
      const argv = ['kss']
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
          '--builder=' + kssConf.builder
        )

        // Add the Twig extensions.
        if (kssConf.twig) {
          argv.push('--extend-drupal8')
          const kssNamespaces = {
            kalastatic: '.',
            atoms: path.join('components', 'atoms'),
            molecules: path.join('components', 'molecules'),
            organisms: path.join('components', 'organisms')
          }
          extend(kssNamespaces, kssConf.namespaces)
          for (const kssNamespaceName in kssNamespaces) {
            if (kssNamespaces[kssNamespaceName]) {
              argv.push('--namespace=' + kssNamespaceName + ':' + path.join(base, source, kssNamespaces[kssNamespaceName]))
            }
          }
        }

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
          kssConf.source = [
            path.join(base, source),
            __dirname
          ]
        }

        // Load up the stylesheets.
        let dirIndex = 0
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
      const kssOptions = {
        stdout: process.stdout,
        stderr: reject,
        argv
      }
      return kss(kssOptions).then(resolve).catch(reject)
    })
  })
}

module.exports = KalaStatic
