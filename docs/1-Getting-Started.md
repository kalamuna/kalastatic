# Getting Started

This outlines how to get started with using KalaStatic from a fresh start.

## Dependencies

- [Node.js](https://nodejs.org) 4, 6 or 7
  - Through [nvm](https://github.com/creationix/nvm), run `nvm use`

## Install

    $ npm install kalastatic --save

## Usage

### Content Files

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

# What BrowserSync should consider the index page.
bsIndex: 'index.html'

# What BrowserSync should consider the webroot when running KalaStatic.
# Defaults to the KalaStatic destination directory.
bsWebroot: ''

# Whether or not to open the browser when initially running Kalastatic.
bsBrowser: false

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

Environmental configuration can be used with...

`kalastatic.develop.yaml`

Where `develop` is the `BRANCH` environment variable.

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

## Conventions

It's easier to collaborate if we share a vocabulary.
Here are some conventions we've found useful for maintaining parallel development, and ensuring that the prototype work dovetails neatly into the production code with minimal—if any—refactoring.

### Text nodes

Anything that would be a text node in html.

```
  "text": "A text node"
```

### Head tags

All those H's

```
  "title": "Água Viva"
```

### Links

A simple link, anchor tags illustrate the use of "text", we use "url" for most urls (aside from src in images).

```
  "link": {
    "text": "Água Viva, by Clarice Lispector",
    "url": "https://en.wikipedia.org/wiki/Clarice_Lispector#.C3.81gua_Viva"
  }
```

### Iterables

When we create collections of things, we like to wrap them in an array named "items," the less guesswork the better.

```
"items": [
  {
    "text": "Água Viva",
    "url": "https://en.wikipedia.org/wiki/Clarice_Lispector#.C3.81gua_Viva"
  },
  {
    "text": "Where Were You at Night and The Via Crucis of the Body",
    "url": "https://en.wikipedia.org/wiki/Clarice_Lispector#Where_Were_You_at_Night_and_The_Via_Crucis_of_the_Body"
  }
]
```

### Images

Images can be simple…

```
"image": {
  "src": "/kalastatic/images/image_name.jpg"
}
```

or quite complex:

```
{
  "src": "http://placehold.it/450x325",
  "width": "450",
  "height": "325",
  "alt": "this is some alt text",
  "srcset": {
    "(max-width: 479px)": {
      "1x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ],
      "2x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ]
    },
    "(min-width: 480px) and (max-width: 767px)": {
      "1x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ],
      "2x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ]
    },
    "(min-width: 768px) and (max-width: 991px)": {
      "1x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ],
      "2x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ]
    },
    "(min-width: 992px) and (max-width: 1199px)": {
      "1x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ],
      "2x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ]
    },
    "(min-width: 1200px)": {
      "1x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ],
      "2x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ]
    }
  }
}

```

<!--
## Collections
## Navigation
 how we do it with the built in tools e.g. metadata file and looping with twig.
Includes (partials)

## Includes (partials)
## Layouts
### Extending (engine specific)
## Ingesting assets from node packages
### Sass  IncludePaths
## .metadata files
## .assets files
## Twig filters
- Bustcache
- Slug
- Drupal filters
-->
