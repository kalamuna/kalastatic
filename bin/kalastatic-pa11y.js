#!/usr/bin/env node

'use strict';

var pa11y = require('pa11y');
var input = JSON.parse(require('fs').readFileSync('./pa11y.json', 'utf8'));
var pages = input.pages;

// Create a test instance with some default options
var test = pa11y({

  // Log what's happening to the console
  log: {
    debug: console.log.bind(console),
    error: console.error.bind(console),
    info: console.log.bind(console)
  }

});

function call(url, callback) {
  test.run(url, callback);
}

async.map(pages, call, function (error, results) { 
  if (error) {
    return console.error(error.message);
  }
  console.log(results.home);
  console.log(results.plants);
});

