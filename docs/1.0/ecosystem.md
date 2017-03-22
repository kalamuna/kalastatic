# Static Site and Prototyping Ecosystem

## Static Site generators
https://staticsitegenerators.net & https://www.staticgen.com

### Roots
**sponsor:** [Carrot Collective](http://carrot.is) | [project page](http://roots.cx) | [docs](http://roots.cx/docs)

**description:** Roots is a node-based static site compiler for SM-M sites used for agency type work. It takes a framework approach whose parts can be changed out, configured, extended. It can create blogs, integrate with APIs, and dynamic content and more.

**example sites:** http://roots.cx/articles/built-with-roots

#### Features
- [CLI](http://roots.cx/docs/cli) to init, build, add templates, and deploy
- [multi-platform deployment](https://github.com/carrot/ship) to Amazon S3, Heroku, Github Pages, Bitballoon, Netlify

#### Extensions
- [client tempaltes](https://github.com/carrot/roots-client-templates) that compile to JS for include on external sites
- [contentful](https://github.com/carrot/roots-contentful) integration to pull json into the site
- [Wordpress integration](https://github.com/carrot/roots-wordpress) via the [jetpack plug-in](https://wordpress.org/plugins/jetpack/)
- [more](http://roots.cx/extensions)


### Hugo

**sponsor**: Steve Francia | [project page](https://gohugo.io/) | [code](https://github.com/spf13/hugo)

**description:** Hugo is a static site generator written in Go. It is optimized for speed. Hugo relies on Markdown files with front matter for meta data. You can run Hugo from any directory. It is distributed as a binary, but can also be installed via homebrew. Good if a site has a TON of content.

#### Features
- taxonomies
- [shortcodes](https://gohugo.io/extras/shortcodes/) to augment markdown with tokens
- [pagination](https://gohugo.io/extras/pagination/)
- menus in yaml
- lots of templates
- themes
- [CLI](https://gohugo.io/commands/) to convert contents to json, yaml, run reports on content

## Prototyping Frameworks


### Pattern Lab

**sponsors:** Brad Frost, Dave Olsen |
**project page:** http://patternlab.io | code: [php](https://github.com/pattern-lab/patternlab-php) [node](https://github.com/pattern-lab/patternlab-node) | [docs](http://patternlab.io/docs/index.html) | [demo](http://demo.patternlab.io/)

**description:** Pattern Lab is a blueprint to provide a styleguide and for protoyping using atomic design principals. It is fairly opinionated in its use of JSON & Mustache. Maintaining content is a bit rough, and it doesn't generate production ready code. Has been intergrated with Drupal via [some work at Phase 2](https://www.phase2technology.com/blog/your-frontend-methodology-is-all-of-them-atomic-design-patternlab/).

#### Features
- in-browser responsive previews
- [cli](http://patternlab.io/docs/command-line.html) to generate, watch
- Drupal integration via [pattern-lab-starter](https://github.com/phase2/pattern-lab-starter) or [yeoman generator](https://github.com/phase2/generator-pattern-lab-starter)

## Styleguides

http://styleguides.io & http://styleguides.io/examples.html

### Style Guide Boilerplate
[code](https://github.com/bjankord/Style-Guide-Boilerplate)

**description:** A starting point for crafting living style guides. Runs with PHP's built-in webserver

### Living Styleguide
[code](https://github.com/livingstyleguide/livingstyleguide) | [demo](http://brettjankord.com/projects/style-guide-boilerplate/)

**description**: Easily create living style guides/front-end style guides/pattern libraries by adding Markdown documentation to your Sass project. Ruby gem with rails integration. Stand-alone solution

## Web Components

### Polymer
[project page](https://www.polymer-project.org/1.0/) | [code](https://github.com/polymer) | [docs](https://www.polymer-project.org/1.0/docs/start/getting-the-code.html)
