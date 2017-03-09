var execFile = require('child_process').execFile
var fs = require('fs')
var path = require('path')
var assertDir = require('assert-dir-equal')
var KalaStatic = require('..')
var test = require('testit')
var nconf = require('nconf')
var extend = require('extend-shallow')
var cmd = require('node-cmd')

function setupTest(name, opts) {
  test(name, function () {
    return new Promise(function (resolve, reject) {
      // Create the configuration for the test.
      var conf = new nconf.Provider()

      // Force the settings for the test.
      var testOpts = {
        base: path.join('test', 'fixtures', name)
      }
      extend(testOpts, opts)
      conf.overrides(testOpts)

      // Create the environment.
      var kalastatic = new KalaStatic(conf)
      kalastatic.build().then(function () {
        // Make sure the build passes.
        var base = kalastatic.nconf.get('base')
        var build = path.join(base, kalastatic.nconf.get('destination'))
        var expected = path.join(base, 'expected')
        assertDir(build, expected)

        // Continue the test suite.
        resolve()
      }, reject).catch(reject)
    })
  })
}

setupTest('basic')
setupTest('layouts')
setupTest('styles', {
  kss: true
})
setupTest('twig-filters', {
  pluginOpts: {
    'metalsmith-jstransformer': {
      engineLocals: {
        twig: {
          awesomeSauce: 'This Is The AwesomeSauce!'
        }
      }
    }
  }
})

test('cli', function (done) {
  var options = {
    cwd: 'test/fixtures/basic'
  }
  execFile(fs.realpathSync('bin/kalastatic'), [], options, function (err, stdout, stderr) {
    if (err) {
      return done(err)
    }
    if (stderr) {
      return done(stderr.toString())
    }
    assertDir('test/fixtures/basic/build', 'test/fixtures/basic/expected')
    done()
  })
})

test('createcomponent', function (done) {
  var options = {
    cwd: 'test/fixtures/createcomponent'
  }

  var cdcmd = 'cd ' + options.cwd
  cmd.get(cdcmd, function() {
    cmd.get('kalastatic cc atoms/link', function () {
      assertDir('test/fixtures/createcomponent/output', 'test/fixtures/createcomponent/expected')
      done()
    })
  })
})
