# Integrating Kalastatic with Kalatheme

## Installation 
This documents creating a Drupal 7 installation that binds [Kalatheme](https://www.drupal.org/project/kalatheme) with Kalastatic.

1. Install [Kalatheme](https://www.drupal.org/project/kalatheme)

2. Create a new folder for your Kalathem subtheme, something like `sites/all/themes/mysubtheme`. See [Using Kalatheme and Best Practices](https://github.com/drupalprojects/kalatheme/wiki/Using-Kalatheme-and-Best-Practices) for more info.

3. We recommend extracting [Kalastatic](https://github.com/kalamuna/kalastatic) within your subtheme `sites/all/themes/mysubtheme/kalastatic`, although the [Drupal Kalastatic module](https://github.com/kalamuna/kalastatic_dot_module) will let you define another location.

4. Create a `sites/all/themes/mysubtheme/mysubtheme.info` file with the following contents:

  ```
  name = mysubtheme
  description = A Kalatheme subtheme powered by Twitter Bootstrap & Science.
  base theme = kalatheme
  core = 7.x
  regions[content] = Content
  stylesheets[all][] = kalastatic/build/styles/main.css
  stylesheets[all][] = css/mysubtheme.css
  ```

5. Build Kalastatic:

  ```
  cd sites/all/themes/mysubtheme/kalastatic
  npm install
  npm test
  ```

## Upgrading

To upgrade Kalastatic once it has been [integrated with Kalatheme](https://github.com/kalamuna/kalastatic/wiki/Integrating-Kalastatic-with-Kalatheme) in Drupal 7.

1. Create a new branch in your theme:
  ```
  git checkout -b upkstat
  ```

2. Delete the `kalastatic` folder from the theme.

3. Download the latest version of Kalastatic by [visiting the Kalastatic project page](https://github.com/kalamuna/kalastatic) and clicking [Download ZIP](https://github.com/kalamuna/kalastatic/archive/master.zip). Eventually, we will be issuing more defined [releases](https://github.com/kalamuna/kalastatic/releases), and, further down the road, a CLI to ease upgrading.

4. Extract `kalastatic-master.zip` inside your Kalatheme subtheme, and rename it to `kalastatic`.

5. Review and restore any of your custom changes with:
  ```
  git diff
  ```

6. Add the changes:
  ```
  git add -A
  ```

7. Commit and push the changes:
  ```
  git commit -m "Update Kalastatic to latest version"
  git push origin upkstat
  ```

8. Issue a pull request, or merge this work into your branch, as your workflow dictates
