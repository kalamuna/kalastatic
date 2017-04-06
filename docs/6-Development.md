# Development

On the backend, Kalastatic is built from a number of technologies. This section will cover how Kalastatic is built, developed, and managed.

## Version Strategy

Kalastatic supports version compatibility through a MAJOR.MINOR.PATCH strategy with [Semantic Versioning](http://semver.org).

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

Read more about [semantic versioning in npm](https://semver.npmjs.com/) to see how better you can target different versions of Kalastatic.

## Node
## Metalsmith
## KSS
## Twig? (maybe not because we're supposedly engine agnostic)
## Browsersync
## … flesh out
## Decoupled front-end dev with livereload
## Use whatever you want - unopinionated, agnostic
