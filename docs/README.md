# Overview

Kalastatic is a prototyping framework and static site generator.

### Featuring:
* Easy installation, with minimal dependencies
* Produces documented component library
* Output production ready styles that can be ingested by other systems
* **Browsersync:**
    - Built in webserver
    - Live reload - saving files reloads the browser
    - Remote device access - load your local on a mobile device!
* **Node:**
    - Automated download of front end frameworks and other dependencies
    - Automated Deployments
* **Twig, or your template engine of choice:**
    - Easy creation of extendable template variations with inheritance
* **Convenience Utilities:**
    - Cache busting
    - Deep linking (url fragments)
    - Character limit filters
    - Splits CSS files for IE compatibility

At Kalamuna we use Kalastatic to put into practice atomic web design principles to produce a living styleguide/component library that can be used to guide back-end implementations in a framework-agnostic approach.

It integrates tightly with Drupal 7 and 8, effectively sharing twig templates between the styleguide, prototype and the CMS.

Kalastatic serves as a point of convergence between front-end development, back-end development, and content strategy. Ultimately it facilitates putting design first, and this in front users for testing, and stakeholders for meaningful and timely feedback.


## Overview

## Benefits
### Stakeholders
#### Clients
- Small uncertainties in communication get ironed out much earlier.
- Real, demonstrable progress happens early.
- Many concerns can be addressed during the project, instead of waiting for certain milestones.
- The whole process becomes more participatory.

#### Agency, PMs, Account Managers
- The client never sees a barebones generic site during demos.
- From first contact, their branding, typography and colors are in place. This avoids uncertainty, stress and education.
- Specific client feedback happens earlier on assets that are cheaper to fix as a prototype than a back-end build.

#### User Experience
- We can test assumptions with stakeholders earlier.
- We can "show not tell" more effectively.
- It's easier to communicate with stakeholders about abstractions when we are looking at something concrete.

#### Frontend Dev
- Can work in tools commonly used in the trade.
- Now in control of markup, as opposed to working around it.
- Can be involved earlier, and stick around later in the process.
- We begin working through responsive issues as soon as we begin styleguiding, this results in more successful first passes, less suprises, and better decisions about our responsive/adaptive patterns.

#### Content Strategist
- Doesn't have to wait for the CMS to be in place to see content in-situ.
- Integrations with third party content staging systems like [prismic](https://prismic.io) [gathercontent](https://gathercontent.com)

#### Backend developers
- Documented components can clarify implementation needs in code conversation with the front-end team.
- Json mock data tells me what needs to be made available to templates.


## Features

### Styleguide

#### What's a styleguide?

A web Styleguide offer a way of ensuring consistency between brand, design and code.
Herein we are looking documenting every component and its code on the site in one place to ensure "same-pagey" communications between designers, front end developers and developers.

The pattern portfolio expresses every component and layout structures throughout the site.
It articulates the atomic design structure, and is used to illustrate the project’s shared vocabulary.

#### The Kalastatic Styleguide
Website styleguides serving both as pattern library, but can also be serve as brand styleguide, to ensure consistency and conformity in the use of brand assets. The styleguide not only ensures that new front end development can follow established patterns, but also facilitates the creation of on brand ancillary digital properties. Its compiled CSS and JS assets can be referenced and consumed by third party services as well to create harmonious expressions across multiple systems.

Kalastatic uses [kss-node](https://github.com/kss-node/kss-node) as the basis for its styleguide.

Kalastatic uses the [KSTAT-KSS-Builder](https://github.com/kalamuna/kstat-kss-builder) to generate the styleguide, which extends some of the documenation features to make it better suited for documenting colors, and other brand-related style concerns.



### Prototype

To provide working, responsive prototypes, we use [metalsmith](https://metalsmith.io) and a bevvy of [other tools](https://github.com/kalamuna/kalastatic/blob/master/package.json)

Prototyping is most useful to consider the components with layouts, side by side with other elements. Where the styleguide documents components in isolation, prototyping helps us see all the bits in context, and even develop behaviors (js) and other integrations, before we dive into CMSs and app-frameworks.

Prototypes can be created at will, and draw upon the family of defined components in the system to build out pages, complete with custom content.

## Resources

A list of links and further readings for KalaStatic-related developments.

### Twig

- http://twig.sensiolabs.org
- http://www.annertech.com/blog/things-learned-drupal-twig-slack-volume-1
- https://slackinvite.me/to/drupaltwig
- https://drupalize.me/videos/twig-basics?p=1899
- https://drupalize.me/tutorial/twig-drupal?p=2512
- https://drupalize.me/search?query=twig
- https://www.drupal.org/docs/8/theming/twig

### SASS

- http://sass-lang.com

### JavaScript

- https://es6.io/

## Development

On the backend, Kalastatic is built from a number of technologies. This section will cover how Kalastatic is built, developed, and managed.

### Version Strategy

In order to not break existing installs and uses of Kalastatic, Kalastatic uses a MAJOR.MINOR.PATCH version strategy through [Semantic Versioning](http://semver.org).

- MAJOR version when you make incompatible API changes
- MINOR version when you add functionality in a backwards-compatible manner
- PATCH version when you make backwards-compatible bug fixes

When installing, use the latest available version of Kalastatic:

```
npm install kalastatic --save
```

```
"dependencies": {
  "kalastatic": "^3.1.0"
}
```

To update Kalastatic, make sure to target the latest of your selected MAJOR release (`3`), bringing in the latest MINOR release. To upgrade to a MAJOR release of Kalastatic (`4`), make sure to read through the [CHANGELOG.md](https://github.com/kalamuna/kalastatic/blob/master/CHANGELOG.md) to understand what changes you should be aware of.

Read more about [semantic versioning in npm](https://docs.npmjs.com/getting-started/semantic-versioning) to see how to better target different versions of Kalastatic.

### Node

KalaStatic uses [Node.js](https://nodejs.org) to build out the front-end components needed. Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine that has a large open source package ecosystem named [npm](https://www.npmjs.com/). Due to Node.js's use of JavaScript, there are a lot of front-end tools available for KalaStatic's use.

See [KalaStatic on npm](https://www.npmjs.com/package/kalastatic) for more information.

### Metalsmith

[Metalsmith](https://github.com/segmentio/metalsmith) is a pluggable static site generator that KalaStatic makes use of to build out its prototype. Due to Metalsmith's pluggable architecture, KalaStatic has the ability to add functionality that doesn't come out of the box with Metalsmith.

The following is a list of Metalsmith plugins that KalaStatic makes use of:

- [metalsmith-assets-convention](http://npm.im/metalsmith-assets-convention)
- [metalsmith-collections-convention](http://npm.im/metalsmith-collections-convention)
- [metalsmith-concat-convention](http://npm.im/metalsmith-concat-convention)
- [metalsmith-define](http://npm.im/metalsmith-define)
- [metalsmith-env](http://npm.im/metalsmith-env)
- [metalsmith-ignore](http://npm.im/metalsmith-ignore)
- [metalsmith-jstransformer](http://npm.im/metalsmith-jstransformer)
- [metalsmith-metadata-convention](http://npm.im/metalsmith-metadata-convention)
- [metalsmith-metadata-files)](http://npm.im/metalsmith-metadata-files)
- [metalsmith-paths](http://npm.im/metalsmith-paths)

For more information on how KalaStatic uses metalsmith, see the Prototyping section.

### KSS

The responsibility of building out the styleguide is taken on by [KSS](http://kss-node.github.io/kss-node/). KSS is a documentation syntax in CSS that's intended to have syntax readable by humans and machines, and create a "living style guide" from it.

For more information on KSS and how KalaStatic uses it, see the Styleguide section.

### Twig and other Template Engines

KalaStatic allows use of a few different template engines, with a primary focus on [Twig](https://twig.sensiolabs.org). While Twig "is a modern template engine for PHP", KalaStatic makes use of the [the Node.js port of Twig](https://github.com/twigjs/twig.js). This allows KalaStatic to build out the prototype and styleguide in Node.js, while allowing template parity with the the the native PHP version of Twig.

For more information on the template engines available, see the [Template Engines section](4-Prototyping.md).

### Browsersync

[Browsersync](https://www.browsersync.io/) serves a local development environment and allows for live-reload workflow in front-end development. To run Browsersync through KalaStatic, use:

```
kalastatic start
```

### Unopinionated

There are many ways to skin a cat. KalaStatic serves the needs of a minimalist platform to build a prototype and maintain a living styleguide. It does not enforce its methods, and its only goal is to serve a prototype and a styleguide. KalaStatic is agnostic to your personal choice of frameworks and tools.
