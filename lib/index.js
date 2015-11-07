var assert = require('assert');

function KalaStatic(nconf) {
  assert(conf, 'An nconf configuration is required.');
  nconf.defaults({
    'directory': 'src'
  })
  this.nconf = nconf;
}

KalaStatic.prototype.build = function () {
  var directory = this.nconf.get('directory');
  console.log(directory);
};

module.exports = KalaStatic;
