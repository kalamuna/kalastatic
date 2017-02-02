# kalastatic [![Build Status](https://travis-ci.org/kalamuna/kalastatic.svg?branch=2)](https://travis-ci.org/kalamuna/kalastatic)

Static site application framework for prototyping and styleguiding.

## Dependencies

- [Node.js](https://nodejs.org) 4, 6 or 7

## Install

    $ npm install kalastatic --save

## Usage

### Convention

Construct your source files, using the template engine name in the file extension. The following example uses the [Pug](https://pugjs.org/) template engine, but others are available ([Twig](https://github.com/twigjs/twig.js), [Mustache](https://github.com/janl/mustache.js/), etc).

#### src/index.html.pug
``` pug
---
pretty: true
title: Hello World!
---
doctype html
html(lang="en")
  head
    title= title
  body
    h1= title
```

### Configuration

KalaStatic can be configured through a `kalastatic.yaml` file. The default options are as follows:

``` yml
# The base directory of where the base KalaStatic lives.
base: .

# The directory (from base), where the source content files live.
source: src

# Where the files will be built out to.
destination: build

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

Runs through the KalaStatic build tasks and outputs to the destination folder.

```
node_modules/.bin/kalastatic build
```

#### Start

Starts up a development server through [BrowserSync](https://www.browsersync.io/) in order to watch and serve KalaStatic. Changes you make to the source will automatically reflect in the browser.

```
node_modules/.bin/kalastatic start
```

#### Scripts

While you can run `kalastatic` as a CLI application, it is recommended to run the above commands through the use of [npm scripts](https://docs.npmjs.com/misc/scripts) in `package.json`:

```
"scripts": {
  "test": "kalastatic build",
  "start: "kalastatic start"
}
```

Then you can simply run the following commands to interact with your project:

```
npm test
npm start
```

### API

KalaStatic can be used a JavaScript API. Calling `KalaStatic()` will build, and return a Promise.

``` javascript
var KalaStatic = require('kalastatic')
KalaStatic('path/to/site').then(function() {
  // Site built
})
```
