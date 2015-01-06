kalastatic
==========

Static site framework for prototyping and building out CMS-less websites at Kalamuna.

## Features

* [Metalsmith](http://www.metalsmith.io) static site generator
* [Swig](https://paularmstrong.github.io/swig/) template engine
* [SASS](http://sass-lang.com) CSS pre-processor
* [KSS](http://warpspire.com/kss/) CSS Documentation and Styleguide



## Requirements

* [Node.js](http://nodejs.org/) >=0.10
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
npm run-script build
```

2. Visit the compiled `build` folder to see the built site


### Development

1. Install Grunt globally

    npm install -g grunt-cli

2. Run `grunt`

3. Visit [`0.0.0.0:8000`](http://0.0.0.0:8000) in your browser

4. Visit [`0.0.0.0:8000/stylguide`](http://0.0.0.0:8000/styleguide) for the style guide
