var assertDir = require('assert-dir-equal')
var KalaStatic = require('../')
var assert = require('assert')
var execFile = require('child_process').execFile
var fs = require('fs')
var it = require('testit')
var assert = require('assert')
var rimraf = require('rimraf')

function test(name) {
  /* global it */
  it(name, function (done) {
    var testPath = 'test/fixtures/' + name
    rimraf(testPath + '/build', function () {
      KalaStatic(testPath).then(function () {
        assertDir(testPath + '/build', testPath + '/expected')
        done()
      }, done).catch(done)
    })
  })
}

test('basic')

it('cli', function (done) {
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
