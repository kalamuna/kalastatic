var assert = require('assert');

function KalaStatic(nconf) {
  assert(nconf, 'An nconf configuration is required.');
  this.nconf = nconf;
}

KalaStatic.prototype.build = function () {
  var self = this;
  return new Promise(function (resolve) {
    console.log('Source directory:');
    var directory = self.nconf.get('directory') || 'src';
    console.log(directory);
    resolve();
  });
};

module.exports = KalaStatic;
