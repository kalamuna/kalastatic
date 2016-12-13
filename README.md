# kalastatic [![Build Status](https://travis-ci.org/kalamuna/kalastatic.svg?branch=2)](https://travis-ci.org/kalamuna/kalastatic)

Static site application framework for prototyping and styleguiding.

## Install

### Dependencies

- [node](https://nodejs.org) 4, 5 or 6

### Globally

    $ npm install kalastatic -g

### Project Dependency

To install KalaStatic as a dependency in your project:

    $ npm install kalstatic --save

## Usage

### Convention

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

### Configuration

KalaStatic can be configured through a `kalastatic.yml` file. The default options are as follows:

``` yml
# The base directory of where the base KalaStatic lives.
base: '.',

# The directory (from base), where the source content files live.
source: 'src',

# Where to build out the files.
destination: 'build',

# The options to pass off to the Metalsmith plugins when building, keyed by plugin name.
pluginOpts: {}

# Where the final CSS will be built out to. This is used for the Styleguide.
css: '../main.css',

# Additional sources to read for KSS documentation for the styleguide.
kssSource: [],

# KSS Builder; Defaults to Twig.
builder: false
```

### Build

#### Globally

    $ kalastatic build

#### Project Dependency

    $ node_modules/.bin/kalastatic build

## API

KalaStatic can be used a JavaScript API. Calling `KalaStatic()` will build, and return a Promise.

``` javascript
var KalaStatic = require('kalastatic')
KalaStatic('path/to/site').then(function() {
  // Site built
})
```
