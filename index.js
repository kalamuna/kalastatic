var Metalsmith = require('metalsmith')
var Promise = require('promise')
var fs = require('fs')
var path = require('path')
var extend = require('extend')

function getConfig (base, cb) {
  if (!base) {
    base = '.'
  }
  var config = {
    plugins: [
      {
        // Initially ignore the node_modules directory.
        'name': 'metalsmith-ignore',
        'options': 'node_modules'
      },
      {
        // Load information from the environment variables.
        'name': 'metalsmith-env'
      },
      {
        // Add base, dir, ext, name, and href info to each file.
        'name': 'metalsmith-paths'
      },
      {
        // Load metadata info the metalsmith metadata object.
        'name': 'metalsmith-metadata-convention'
      },
      {
        // Concatenate any needed files.
        'name': 'metalsmith-concat-convention'
      },
      {
        // Load all collections.
        'name': 'metalsmith-collections-convention'
      },
      {
        // Load all Partials.
        'name': 'metalsmith-jstransformer-partials'
      },
      {
        // Render all content with JSTransformers.
        'name': 'metalsmith-jstransformer'
      },
      {
        // Render all layouts with JSTransformers.
        'name': 'metalsmith-jstransformer-layouts'
      },
      {
        // Ignore all partials and layouts.
        'name': 'metalsmith-ignore',
        'options': '**/_*'
      }
    ]
  }
  var packageJson = path.join(base, 'package.json')
  fs.readFile(packageJson, function (err, data) {
    if (err) {
      data = {}
    } else {
      data = JSON.parse(data)
    }
    config = extend({}, data, config)
    cb(config)
  })
}

module.exports = function (base) {
  return new Promise(function (fulfill, reject) {
    getConfig(base, function (config) {
      var metalsmith = Metalsmith(base)

      for (var i in config.plugins) {
        var pluginName = config.plugins[i].name
        var pluginOptions = config.plugins[i].options || {}
        var plugin = require(pluginName)
        metalsmith.use(plugin(pluginOptions))
      }

      if (config.source) {
        metalsmith.source(config.source)
      }

      metalsmith.build(function (err) {
        if (err) {
          return reject(err)
        }
        fulfill()
      })
    })
  })
}
