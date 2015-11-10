var assert = require('assert');

function KalaStatic(nconf) {
  // Make sure there is an nconf configuration.
  assert(nconf, 'An nconf configuration is required.');

  // Set the default values.
  nconf.defaults({
    directory: 'src',
    destination: 'build'
  });

  // Set the properties of the object.
  this.nconf = nconf;
}

KalaStatic.prototype.build = function () {
  var self = this;
  return new Promise(function (resolve) {
    console.log('Source directory:');
    var directory = self.nconf.get('directory');
    console.log(directory);
    resolve();
  });
};

module.exports = KalaStatic;
