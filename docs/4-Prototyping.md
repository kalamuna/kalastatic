# Prototyping

A website prototype can be any mock-up or demo of what a website could look like when it goes live. A living prototype is a prototype that's actively used throughout the lifecycle of the website. Even after the site is deployed, the prototype lives on as an active demonstration of what the website looks like.

The following features and conventions come together to allow the creation of a living prototype.

## Conventions

### Meta-Data

Meta-Data is general data that helps describe the content you're presenting. Depending on the scope, meta-data can exist almost anywhere.

#### Local

Add YAML front-matter to files to append properties to the file.

*example.html*
```
---
name: Linus Torvalds
languages:
- PHP
- Perl
- Python
---
<h1>Linus Torvalds</h1>
```

*output*
```
<h1>Linux Torvalds</h1>
```

#### Global

You can add global meta-data through the use of the [metalsmith-metadata-convention](https://www.npmjs.com/package/metalsmith-metadata-convention) plugin and `.metadata` files.

*authors.metadata*
```
---
Stephen King:
  birthdate: 1947
J. K. Rowling:
  birthdate: 1965
William Shakespeare:
  birthdate: 1564
Nora Roberts:
  birthdate: 1950
---

This list of authors is loaded into a global metadata variable named "authors".
```

### Transformers

Naming a file by a [JSTransformer](https://github.com/jstransformers/jstransformer) name will have it process with the engine. The following is an example of using [Twig](http://twig.sensiolabs.org):

*example.html.twig*
```
---
name: Linus Torvalds
---
<h1>{{ name }}</h1>
```

*output*
```
<h1>Linus Torvalds</h1>
```

See [JSTransformers](https://github.com/jstransformers) for a list of available transformers, and [metalsmith-jstransformer](https://www.npmjs.com/package/metalsmith-jstransformer) to see what's possible. The following is a list of transformers that are available through Kalastatic:

- [pug](http://npm.im/jstransformer-pug)
- [twig](http://npm.im/jstransformer-twig)
- [browserify](http://npm.im/jstransformer-browserify)
- [scss](http://npm.im/jstransformer-scss)
- [md](http://npm.im/jstransformer-commonmark)

### Passing in environment variables
### Meta-Data Files

The [metalsmith-metadata-files](https://github.com/kalamuna/metalsmith-metadata-files) plugin will inject sister JSON files into the main file.

*example.html.json*
```
{
  "name": "Linus Torvalds"
}
```

*example.html.twig*
```
<h1>{{ name }}</h1>
```

*output*
```
<h1>Linux Torvalds</h1>
```

### Globals
- kalastatic.yml

### Assets

The [metalsmith-assets-convention](https://github.com/robloach/metalsmith-assets-convention) plugin will deploy any local assets you would like to copy out through the use of `.assets` files:

```
---
source: public
destination: .
---
Copy all the public files into the build directory.
```

### Concatenating Files

In some cases, you'll want to concatenate files. This is handy if you want to bundle some JavaScript together. There are a few different ways to do this.

#### .concat files

The [metalsmith-concat-convention](https://github.com/robloach/metalsmith-concat-convention) plugin will concatenate files based on the use of `.concat` files:

*src/scripts.js.concat*
```
---
files:
- script1.js
- script2.js
insertNewLine: false
---
// This is the collection of all scripts.
```

#### Browserify

[Browserify](http://browserify.org/) is also available to bundle dependencies:

*src/scripts.js.browserify*
```
var firstscript = require('./script1.js')
console.log(firstscript)
```

### Collections

Collections are a method in which to group different files together in an ordered array, like blog posts. It allows looping through the collection to generate indexes, along with next/previous links between them. The [metalsmith-collections-convention](https://www.npmjs.com/package/metalsmith-collections-convention) allows the definition of these collections through the use of `.collection` files:

*articles.collection*
```
---
pattern: 'articles/*.md'
sortBy: date
reverse: true
---
This is the collection of articles that will become available through the global metadata variable "articles".
```

## Namespaces
## Adding Page
- Assigning layout

## Exposing json mock data from KSS as a json key
- Issue about updating this convention here: https://github.com/kalamuna/kalastatic/issues/398

#### Fonts
  - Font face helper mixin?
#### Images
	- Pathing issue
### Twig filters
- Bustcache
- Slug
- limit?
- Drupal filters
## Loading components from npm or composer packages

