# Kalastatic Test Content (Example 1)

## Purpose ##

The purpose of this repository is to provide the simplest possible sample content to test the twig parsing portion of Kalastatic.

## Goal ##

Iterate through the twig files in the pages directory, parse the twig into html, and put the resulting files in a build directory.

## Things this is testing ##

- Iterating over twig files
- Twig extends with blocks
- Twig namespaces (templates and components)
- Twig embeds
- Twig embed using with for variables (optional)
- Outputting html

## Usage

Run Kalastatic locally by using...

```
npm install
npm start
```

### Deployment

Deploying the build to [GitHub Pages](https://pages.github.com) uses the [`gh-pages` npm package](https://www.npmjs.com/package/gh-pages). To publish the build to GitHub Pages, use...

```
npm i
npm run deploy
```

This will push the `build` directory to the `gh-pages` branch, which is what GitHub Pages uses.