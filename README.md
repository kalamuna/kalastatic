# kalastatic [![Build Status](https://travis-ci.org/kalamuna/kalastatic.svg?branch=master)](https://travis-ci.org/kalamuna/kalastatic)

Static site framework for in-browser prototyping and also for building out CMS-less websites at Kalamuna.

demo site: http://test-kalastatic.at.kalamuna.com

## Features

* [Metalsmith](http://www.metalsmith.io) static site generator
* [Swig](https://paularmstrong.github.io/swig/) template engine
* [SASS](http://sass-lang.com) CSS pre-processor
* [KSS](http://warpspire.com/kss/) CSS Documentation and Styleguide
* [Grunt](http://http://gruntjs.com/) for automating tasks


## Requirements

* [Node.js](http://nodejs.org/) >=4.2
* [npm](http://npmjs.org)


## Usage

### Download the site

    git clone git@github.com:kalamuna/kalastatic.git
    cd kalastatic


### Install Dependencies

    npm install


### Build

1. Build the site using the following command:

  ```
  npm test
  ```

2. Visit the compiled `build` folder to see the built site

### Configuration

#### `basePath`

You can change the webroot path of the static site by manipulating the `basePath` environment variable on compilation:

```
basePath=/sites/all/themes/mytheme/kalastatic/build/ npm test
```

From within the template, use the `basePath` variable when you want to link to a file from the webroot.

```
<link rel="stylesheet" type="text/css" href="{{basePath}}styles/main.css'">
```

The default of `basePath` is `/`. This can also be set in [`.travis.yml`](.travis.yml).

#### `pa11y.json`

Add pages that you would like the run accessibility checks on in the `pages` key of [`pa11y.json`](pa11y.json).

### Deployment

To manually deploy the site, run:
  ```
  npm run deploy
  ```

### Development

1. Run the following command to build, watch and serve the site:

  ```
  npm start
  ```

2. Visit [`0.0.0.0:8000`](http://0.0.0.0:8000) in your browser
3. Visit [`0.0.0.0:8000/stylguide`](http://0.0.0.0:8000/styleguide) for the style guide
4. Visit [`0.0.0.0:8000/a11y`](http://0.0.0.0:8000/a11y) for an accessibility report

#### Tasks

- `npm install` - Install local dependencies
- `npm run build` - Builds the site and the styleguide
- `npm test` - Builds the site, styleguide, and runs reports (a11y)
- `npm start` - Watches and serves the site for local development
- `npm run deploy` - Manually deploys the site to what is defined in the "deploy" configuration, outside of automated deployment
- `npm run kss` - Builds the KSS styleguide
- `npm run a11y` - Builds the pa11y reports

### Releases

In order for a release to be made, the following workflows must be met:

1. All merged Pull Requests to `master` are automatically pushed up to the [DEV environment on Pantheon](https://dashboard.pantheon.io/sites/99097056-c6bd-451e-a94b-fc8f7666fbe5#dev/code)
2. Periodically, we will push DEV up to TEST, to ensure all functionality is there.
3. When TEST passes QA, we will tag a KalaStatic release using [Semantic Versioning](http://semver.org/).
