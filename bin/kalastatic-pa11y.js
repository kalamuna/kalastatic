#!/usr/bin/env node
'use strict';

// Dependencies
var childProcess = require('child_process')
var fs = require('fs')
var shellEscape = require('shell-escape')

// Load the pages to parse on.
var input = JSON.parse(require('fs').readFileSync('./pa11y.json', 'utf8'));
var pages = input.pages;

// Retrieve the current working directory.
var cwd = require('process').cwd()

// Begin the index template, sharing the CSS style from the pa11y report.
var output = '<!doctype html><html lang="en"><head><meta charset="utf-8"><body>'
output += '<style> html, body { margin: 0; padding: 0; background-color: #fff; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 22px; color: #333; } li { margin-bottom: 15px; } h1, h2, p, pre, ul { margin-top: 0; margin-bottom: 0; } h1 { margin-bottom: 10px; font-size: 24px; line-height: 24px; } h2 { font-size: 16px; } pre { white-space: pre-wrap; overflow: auto; } .page { max-width: 800px; margin: 0 auto; padding: 25px; } .counts { margin-top: 30px; font-size: 20px; } .count { display: inline-block; padding: 5px; border-radius: 5px; border: 1px solid #eee; } .clean-list { margin-left: 0; padding-left: 0; list-style: none; } .results-list { margin-top: 30px; } .result { padding: 10px; border-radius: 5px; border: 1px solid #eee; } .error { background-color: #fdd; border-color: #ff9696; } .warning { background-color: #ffd; border-color: #e7c12b; } .notice { background-color: #eef4ff; border-color: #b6d0ff; } </style>'
output += '<div class="page"><h1>Accessibility Reports</h1><ul>'

// Run the accessibility report for each page.
for (var i in pages) {
  // Construct the executable to run pa11y.
  var args = ['pa11y']
  args.push('-c', './pa11y.json')
  args.push('-r', 'html')
  args.push('-l', 'none')
  args.push('file://' + cwd + '/build/' + pages[i])
  var cmd = shellEscape(args) + ' > build/a11y/' + i + '.html'

  // Run the command.
  childProcess.execSync(cmd)

  // Add the report to the index.
  output += '<li><a href="' + i + '.html">' + pages[i] + '</a></li>'
}

// Finish and save the template.
output += '</ul></div></body></html>'
fs.writeFileSync('build/a11y/index.html', output)
