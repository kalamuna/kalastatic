# Development

On the backend, Kalastatic is built from a number of technologies. This section will cover how Kalastatic is built, developed, and managed.

## Version Strategy

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

## Node

KalaStatic uses [Node.js](https://nodejs.org) to build out the front-end components needed. Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine that has a large open source package ecosystem named [npm](https://www.npmjs.com/). Due to Node.js's use of JavaScript, there are a lot of front-end tools available for KalaStatic's use.

See [KalaStatic on npm](https://www.npmjs.com/package/kalastatic) for more information.

## Metalsmith

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

## KSS

The responsibility of building out the styleguide is taken on by [KSS](http://kss-node.github.io/kss-node/). KSS is a documentation syntax in CSS that's intended to have syntax readable by humans and machines, and create a "living style guide" from it.

For more information on KSS and how KalaStatic uses it, see the Styleguide section.

## Twig and other Template Engines

KalaStatic allows use of a few different template engines, with a primary focus on [Twig](https://twig.sensiolabs.org). While Twig "is a modern template engine for PHP", KalaStatic makes use of the [the Node.js port of Twig](https://github.com/twigjs/twig.js). This allows KalaStatic to build out the prototype and styleguide in Node.js, while allowing template parity with the the the native PHP version of Twig.

For more information on the template engines available, see the [Template Engines section](4-Prototyping.md).

## Browsersync

[Browsersync](https://www.browsersync.io/) serves a local development environment and allows for live-reload workflow in front-end development. To run Browsersync through KalaStatic, use:

```
kalastatic start
```

## Unopinionated

There are many ways to skin a cat. KalaStatic serves the needs of a minimalist platform to build a prototype and maintain a living styleguide. It does not enforce its methods, and its only goal is to serve a prototype and a styleguide. KalaStatic is agnostic to your personal choice of frameworks and tools.
