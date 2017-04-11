# Prototyping

A website prototype can be any mock-up or demo of what a website could look like when it goes live. A living prototype is a prototype that's actively used throughout the lifecycle of the website. Even after the site is deployed, the prototype lives on as an active demonstration of what the website looks like.

The following features and conventions come together to allow the creation of a living prototype.

## Conventions

### Meta-Data

Meta-Data is way to give files generic data that helps describe the content you're presenting. Depending on the defining method, meta-data can exist almost anywhere. The following are a few ways to introduce meta-data.

#### Local Front-Matter

Introduce [YAML](http://yaml.org) Front-Matter to define local variables. These are useful when you would like to output some dynamic data. The YAML is wrapped in `---` to distinguish it from the file's content.

*example.html.twig*
``` twig
---
name: Linus Torvalds
languages:
- PHP
- Perl
- Python
---
<h1>{{ name }}</h1>
```

*output*
``` html
<h1>Linux Torvalds</h1>
```

#### Meta-Data JSON Files

In some cases, YAML Front-Matter can sometimes cause conflicts with the template engine that's being used to process the content. Twig, for example, does not support YAML Front-Matter. In this case, you will want to introduce a meta-data JSON file. Having The [metalsmith-metadata-files](https://github.com/kalamuna/metalsmith-metadata-files) plugin will inject sister JSON files into the main file.

*example.html.json*
``` json
{
  "name": "Linus Torvalds"
}
```

*example.html.twig*
``` twig
<h1>{{ name }}</h1>
```

*output*
```
<h1>Linux Torvalds</h1>
```

#### Global

You can add global meta-data through the use of the [metalsmith-metadata-convention](https://www.npmjs.com/package/metalsmith-metadata-convention) plugin and `.metadata` files.

*authors.metadata*
``` yaml
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

### Template Engines

There are many different template engines out there, and Kalastatic has the ability to use them all through the use of [JSTransformers](https://github.com/jstransformers/jstransformer). Naming a file by the template engine's extension will have it process with the given engine. The following is an example of using [Twig](http://twig.sensiolabs.org):

*example.html.twig*
``` twig
---
name: Linus Torvalds
---
<h1>{{ name }}</h1>
```

*output*
``` html
<h1>Linus Torvalds</h1>
```

See [JSTransformers](https://github.com/jstransformers) for a list of available transformers, and [metalsmith-jstransformer](https://www.npmjs.com/package/metalsmith-jstransformer) to see what's possible. The following is a list of transformers that are available through Kalastatic:

- [pug](http://npm.im/jstransformer-pug)
- [twig](http://npm.im/jstransformer-twig)
- [browserify](http://npm.im/jstransformer-browserify)
- [scss](http://npm.im/jstransformer-scss)
- [md](http://npm.im/jstransformer-commonmark)

### Assets

Third-party vendor libraries and assets can be bundled as static assets through the [metalsmith-assets-convention](https://github.com/robloach/metalsmith-assets-convention) plugin. It will deploy any local assets you name in `.assets` files:

``` yaml
---
source: public
destination: .
---
Copy all the public files into the build directory.
```

### Concatenating Files

Concatenating files allows you to put a whole bunch of files together, potentially saving HTTP requests. This is handy if you want to bundle some JavaScript or CSS together. There are a few different ways to do this:

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

[Browserify](http://browserify.org/) is a JavaScript package that lets you `require('modules')` in the browser. To use Browserify in KalaStatic, use the `.browserify` file extension:

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

