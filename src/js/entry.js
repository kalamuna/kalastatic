/**
 * KalaStatic
 *
 * TODO: Get Metalsmith/Browserify to minify the output.
 */

// Dependencies
var $ = require('jquery');
var matchHeight = require("matchheight");
var holderjs = require("holderjs");

/**
 * Document Ready
 */
$(function() {

  // Initiate all pages
  require("./pages/contact")();

});
