var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var assertDir = require('assert-dir-equal');
var KalaStatic = require('..');
var test = require('testit');
var nconf = require('nconf');

function setupTest(name) {
  test(name, function () {
    return new Promise(function (resolve, reject) {
      // Create the configuration for the test.
      var conf = new nconf.Provider();

      // Force the settings for the test.
      conf.overrides({
        base: path.join('test', 'fixtures', name)
      });

      // Create the environment.
      var kalastatic = new KalaStatic(conf);
      kalastatic.build().then(function () {
        // Make sure the build passes.
        var base = kalastatic.nconf.get('base');
        var build = path.join(base, kalastatic.nconf.get('destination'));
        var expected = path.join(base, 'expected');
        assertDir(build, expected);

        // Continue the test suite.
        resolve();
      }, reject).catch(reject);
    });
  });
}

setupTest('basic');
setupTest('layouts');
setupTest('styles');
setupTest('twig-filters');

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
    assertDir('test/fixtures/basic/build', 'test/fixtures/basic/expected');
    done();
  });
});
