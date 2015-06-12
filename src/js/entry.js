/**
 * KalaStatic
 *
 * TODO: Get Metalsmith/Browserify to minify the output.
 */

// Dependencies
var $ = require('jquery');
var bootstrap = require('bootstrap');
var matchHeight = require("matchheight");
var holderjs = require("holderjs");

/**
 * Document Ready
 */
$(function() {
  // Library Dependencies
  var onScroll = require('./lib/onScroll');

  // Events
  $(document).scroll(onScroll.bind(this));

  // Initiate all pages
  require("./pages/contact")();

});
