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

  // Initiate all pages
  require("./pages/contact")();

});
