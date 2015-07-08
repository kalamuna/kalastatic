# kalastatic-cli

Command line interface for KalaStatic.

## Install

    $ npm install kalastatic-cli -g

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

```
$ kalastatic
```

## API

``` javascript
var KalaStatic = require('kalastatic')
KalaStatic('path/to/site').then(function() {
  // Site built
})
