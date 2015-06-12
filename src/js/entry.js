/**
 * KalaStatic
 *
 * TODO: Get Metalsmith/Browserify to minify the output.
 */

// Module Dependencies
var $ = require('jquery');
var bootstrap = require('bootstrap');

/**
 * Document Ready
 */
$(function() {
  // Library Dependencies
  var onScroll = require('./lib/onScroll');

  // Events
  $(document).scroll(onScroll.bind(this));

  // Debug some output
  // TODO: Remove this debug code.
  console.log("Hello World!");
  console.log(bootstrap);
});
