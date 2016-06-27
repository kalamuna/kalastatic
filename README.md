# kalastatic-cli [![Build Status](https://travis-ci.org/kalamuna/kalastatic2.svg?branch=master)](https://travis-ci.org/kalamuna/kalastatic2)

Static site application framework for prototyping and styleguiding.

## Install

### Dependencies

- [node](https://nodejs.org) >= 4

### Globally

    $ npm install kalastatic -g

### Project Dependency

To install KalaStatic as a dependency in your project:

    $ npm install kalstatic --save

## Usage

### Write

Construct your source files, using the template engine name in the file extension.

#### src/index.html.jade
``` jade
---
youAreUsingJade: true
pretty: true
---
doctype html
html(lang="en")
  head
    title= title
  body
    h1 Jade - node template engine
```

### Build

#### Globally

    $ kalastatic

#### Project

    $ node_modules/.bin/kalastatic

## API

``` javascript
var KalaStatic = require('kalastatic')
KalaStatic('path/to/site').then(function() {
  // Site built
})
```
