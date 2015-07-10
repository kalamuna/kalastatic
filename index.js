var Metalsmith = require('metalsmith')
var Promise = require('promise')
var fs = require('fs')
var path = require('path')
var extend = require('extend')

function getConfig(base, cb) {
  if (!base) {
    base = '.'
  }
  var config = {plugins: []}
  var config = {
    plugins: [
      {
        'name': 'metalsmith-ignore',
        'options': [
          'node_modules'
        ]
      },
      {
        'name': 'metalsmith-packagejson'
      },
      {
        'name': 'metalsmith-paths'
      },
      {
        'name': 'metalsmith-metadata-convention'
      },
      {
        'name': 'metalsmith-collections-convention'
      },
      {
        'name': 'metalsmith-jstransformer'
      },
      {
        'name': 'metalsmith-jstransformer-layouts'
      },
      {
        'name': 'metalsmith-metadata-convention'
      },
      {
        'name': 'metalsmith-ignore',
        'options': [
          // Ignore partials.
          '**/_*'
        ]
      }
    ]
  }
  var packageJson = path.join(base, 'package.json')
  fs.readFile(packageJson, function (err, data) {
    if (err) {
      data = {}
    }
    else {
      data = JSON.parse(data)
    }
    config = extend({}, data, config)
    cb(config)
  })
}

module.exports = function (base) {
  return new Promise(function (fulfill, reject) {
    getConfig(base, function (config) {
      console.log(config)

      var metalsmith = Metalsmith(base)

      for (var i in config.plugins) {
        var pluginName = config.plugins[i].name
        var pluginOptions = config.plugins[i].options || {}
        var plugin = require(pluginName)
        metalsmith.use(plugin(config.plugins[pluginName]))
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
