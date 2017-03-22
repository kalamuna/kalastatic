# Building for Drupal Integration
When building a static site with Kalastatic that is going to end up being used in a Drupal theme it's important to keep in mind the sort of markup and dynamic content that Drupal is going to generate in various circumstances so that the css that you write is able to work for Drupal, the style guide as well as the static site.

Generally the Kalastatic site would be being built at the beginning of a project and as such many of the architectural decisions may be yet to be made. However most of us know Drupal well and should be able to make a good guess as to where in Drupal a particular element will be coming from and adjust the static markup accordingly.

Some examples:
Images (other than those in headers/footers) are likely to be a field on an entity so therefore you need to use an img tag instead of a background image in the css.
Form elements are particularly painful to change the markup/get classes on in Drupal so try to avoid extreme customisation if possible.
Try to avoid using fixed heights and widths for your layout without thinking about the dynamic nature of the content inside.  

The markup that Drupal generates is usually far more verbose than desired by most front end enthusiasts but often pragmatism needs to rule often when it comes to these things because taming Drupal’s markup can be difficult.


## Steps for Drupal Integration (in progress)
- Copy Kalastatic inside your theme
- Configure `.travis.yml`'s `basePath` variable to where KalaStatic would live in its Drupal context
```yaml
env:
  global:
  - basePath: /sites/all/themes/mytheme/kalastatic/build/
```
- In the terminal, navigate to kalastatic folder and run `npm start`

###Scripts and Styles
Kalastatic can be set up to ingest CSS and Javascript from Drupal in order that we have parity between spaces.

####CSS
The Drupal theme can just reference the CSS file built by Kalastatic in order to bring in all the styles. This file is usually `build/styles/main.css`. In some cases it may be desirable for the theme to have more control. In this case the theme can provide it's own Sass compilation and reference individual components from within Kalastatic's src folder as they are required.

####Javascript
It's a good idea—once Kalastatic is living inside of Drupal—for all scripts be added by the theme (via .info file or drupal_add_js()) and it will then get pulled into the prototype/style guide automagically. For example:

```
scripts[] = kalastatic/assets/vendor/bootstrap-sass-twbs/assets/javascripts/bootstrap.min.js
```

###Browsersync
When a project comes to the point in its life cycle that you want to start serving the prototype and styleguide through Drupal you need to make the following changes to the `Gruntfile.js`:

In the 'browserSync' section remove:
```
server: {
  baseDir: "./build"
},
```
and replace with:
```
files: ["./build/styles/*.css"],
proxy: "my.dev",
```
Obviously 'my.dev' needs to be replaced with the url of your local site. For more information on these settings, see the [BrowserSync + Grunt documentation](https://www.browsersync.io/docs/grunt). Note that there seems to be some sort of bug between BrowserSync and OSX where the use of the extension `.local` causes the page to load extremely slowly. Using `.dev` seems to work, other extensions may also be fine. See http://stackoverflow.com/questions/24807786/browsersync-extremely-slow for more info.

After you have made the changes to your Gruntfile.js you need to enable the Drupal BrowserSync module (https://www.drupal.org/project/browsersync) and then enable Browsersync for the active theme on the theme settings page (`admin/appearance/settings/*theme_name*`).
