// var assertDir = require('assert-dir-equal');
var KalaStatic = require('../');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var test = require('testit');
var nconf = require('nconf');

function setupTest(name) {
  test(name, function () {
    return new Promise(function (resolve, reject) {
      var dir = path.join('test', 'fixtures', name);
      var conf = new nconf.Provider();
      var opts = {
        directory: path.join(dir, 'src'),
        destination: path.join(dir, 'build')
      };
      conf.defaults(opts);
      var kalastatic = new KalaStatic(conf);
      kalastatic.build().then(function () {
        // assertDir(opts.destination, path.join(dir, 'expected'))
        resolve();
      }, reject).catch(reject);
    });
  });
}

setupTest('basic');
setupTest('layouts');

test('cli', function (done) {
  var options = {
    cwd: 'test/fixtures/basic'
  };
  execFile(fs.realpathSync('bin/kalastatic'), [], options, function (err, stdout, stderr) {
    if (err) {
      return done(err);
    }
    if (stderr) {
      return done(stderr.toString());
    }
    // assertDir('test/fixtures/basic/build', 'test/fixtures/basic/expected')
    done();
  });
});
