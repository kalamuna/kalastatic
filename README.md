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

KalaStatic can be configured through a `kalastatic.yaml` file. The default options are as follows:

``` yml
# The base directory of where the base KalaStatic lives.
base: '.',

# The directory (from base), where the source content files live.
source: 'src',

# Where to build out the files.
destination: 'build',

# The options to pass off to the Metalsmith plugins when building, keyed by plugin name.
pluginOpts: {}

# KSS Styleguide Configuration
kss:
  # Set the path to a custom KSS Builder
  builder: null
  title: "Styleguide"
  homepage: styles/homepage.md
  css: ../styles/main.css
  source:
    - src/components/
    - src/styles/
```

### CLI

KalaStatic can be used as a command line interface. The following are some of its commands:

#### Build

```
kalastatic build --conf=<file>
```

Runs through the KalaStatic build tasks and outputs to the destination folder.

#### Start

```
kalastatic start --conf=<file>
```

Starts up a development server through [BrowserSync](https://www.browsersync.io/) in order to watch and serve KalaStatic. Changes you make to the source will automatically reflect in the browser.

### API

KalaStatic can be used a JavaScript API. Calling `KalaStatic()` will build, and return a Promise.

``` javascript
var KalaStatic = require('kalastatic')
KalaStatic('path/to/site').then(function() {
  // Site built
})
```
