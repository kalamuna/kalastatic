var Metalsmith = require('metalsmith')
var Promise = require('promise')

module.exports = function(base) {
  return new Promise(function (fulfill, reject) {
    if (!base) {
      base = '.'
    }

    var plugins = {
      "metalsmith-paths": true,
      "metalsmith-metadata-convention": {},
      "metalsmith-collections-convention": {},
      "metalsmith-jstransformer": {},
      "metalsmith-ignore": [
        // Ignore partials.
        "**/_*"
      ]
    }

    var metalsmith = Metalsmith(base)

    for (var pluginName in plugins) {
      var plugin = require(pluginName)
      metalsmith.use(plugin(plugins[pluginName]))
    }

    metalsmith.build(function (err) {
      if (err) {
        return reject(err)
      }
      fulfill()
    })
  })
}
