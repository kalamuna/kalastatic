kalastatic
==========

Static site framework for prototyping and building out CMS-less websites at Kalamuna.

demo site: http://test-kalastatic.at.kalamuna.com

## Features

* [Metalsmith](http://www.metalsmith.io) static site generator
* [Swig](https://paularmstrong.github.io/swig/) template engine
* [SASS](http://sass-lang.com) CSS pre-processor
* [KSS](http://warpspire.com/kss/) CSS Documentation and Styleguide
* [Grunt](http://http://gruntjs.com/) for automating tasks


## Requirements

* [Node.js](http://nodejs.org/) >=0.12, up to [0.12.7](https://nodejs.org/dist/v0.12.7/)
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


### Development

1. Run the following command to build, watch and serve the site:

  ```
  npm start
  ```

2. Visit [`0.0.0.0:8000`](http://0.0.0.0:8000) in your browser
3. Visit [`0.0.0.0:8000/stylguide`](http://0.0.0.0:8000/styleguide) for the style guide
