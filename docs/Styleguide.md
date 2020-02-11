# Styleguide

Styleguiding allows you to both have a broad overview of the vocabulary that comprises your project's design language, while at the same time allowing you to gather information about each component in an isolated setting. It facilitates conversations between stakeholders, designers, and developers while ensuring consistency between brand, design and code.

## KSS basics

In essence KSS is a system for documenting site components.
Documentation lives in your [css/sass files](https://github.com/kss-node/kss-node#kss-node) and is parsed by KSS into a styleguide.


### Anatomy of KSS comments

A common KSS comment looks like this:

```
/*
button

A common button

Markup: button.twig

.active - The active state

Styleguide ui.button
*/
```

- The first line is a title.
- Below it description of the component.
- The markupo block is just a reference to the template file itself (kalastatic's KSS implementation assumes twig)
- After that, each line represents a 'class modifier' so we represent style variations of the component in question.
- The "Styleguide" line represents where your component lives in the styleguide's  organizational structure, usually this goes two levels deep.


## Custom KSS builder

In order to prove a more usable, comprehensive, and aesthetically pleasing Styleguide we developed a custom [KSS builder](https://github.com/kalamuna/kstat-kss-builder). It offers cleaner styles, inherit's your site's base styles and offers additional brand-guide elements (colors swatches, type speciments).


## How do I create a top level section?

In the KSS documentation the final line `Styleguide ui.button` will automatically generate a section called `ui` in the styleguide.

But you may want to elaborate withn a cleaner name, and order within the styleguide.

To acheive this you create a standalone KSS comment (usually in your primary sass file) to create the section, e.g:

```
/*
UI elements

These are the project's user interface elements.

Styleguide ui
*/
```

## How do I add a component to an existing section?

Any KSS ```Styleguide xxx.xxxxx``` directive that includes an existing section in the first-half of its identifier will be placed in that section e.g: ```ui.button``` will appear in the Styleguide's ui section.


## How do I document colors

Any `Styleguide xx.xxxxxx` section  containing the string `color-swatches` will be processed as such. Here's an example from Kalamuna's own styleguide: [Kalamuna Brand Colors](https://blog.kalamuna.com/kalastatic/styleguide/section-color-swatches.html)

```
/*
Brand Colors

These are the Progenity brand web colors.

$c__gray - #a8a8a8
$c__gray--mid - #6d6d6d
$c__gray--dark - #58595b
$c__gray--darker - #333
$c__green - #498c36
$c__coral - #f89e70
$c__gold - #fdb913

weight: -100

Styleguide color-swatches
*/
```


### Naming conventions

Althought neither Node-KSS nor Kalastatic are agnostic to your naming conventions, we've found that splitting the styleguide into certain sections keeps things easy to navigate.

* Overview (this is the homepage.md file)
* Colors
* UI
* Content
* Figures
* Media
* Navigation

To order sections you can use the "weight: XX" kehy.

### How do I document type

Aside from creating components to demonstrate your typography, we do have plans to implement more traditional [type specimens](https://github.com/kalamuna/kstat-kss-builder/issues/15)

## How do I reorder items in a section
Any KSS comment can take a `weight` key, the bigger the number the lower it appears in the list. Negative numbers can be used. The Overview section always appears first.

## JSON Mock data via .json files

With node-kss, any JSON file sitting alongside the file containing the KSS documentation for a given component will be passed to the `template` specified in the comment assuming it has the same filename.

So assuming:
```
.
├── _button.scss
├── button.json
└── button.twig
```
and `button.scss` all have a `Markup:` key pointing to `button.twig` kss-node will parse `button.twig` using the data in `button.json`.

## Adding additional js and css files to the styleguide
In Kalastatic we abstract configuring KSS via a `kss` key in `kalastatic.yml`
`kss.css` contains an array of css files to load  and `kss.js` contains an array of additional javascript for KSS to load

Here's an example
```
# Settings for the Styleguide
kss:
  source:
    - "node_modules/bootstrap-sass/assets/stylesheets/bootstrap"
    - "node_modules/font-awesome/scss"
    - "web/sites/all/themes/custom/progmi/kalastatic/src"
  css:
    - "../styles/main.css"
    - "../styles/styleguide.css"
  builder: "path/to/custom-kss-builder"
  js:
    - "../vendor/matchHeight/dist/jquery.matchHeight-min.js"
    - "../vendor/jquery-once/jquery.once.js"
    - "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
    - "../js/drupal_pre.js"
    - "../js/prg.js"
    - "../components/atoms/javascript_test/javascript_test.js"
    - "../js/drupal_post.js"
    - "../js/bootstrap-tab-history.js"
  title: "Progenity Living Styleguide"
  homepage: "styles/homepage.md"
```

## Loading components from npm or composer packages

Any node or composer package can be included in the styleguide provided that it has KSS documentation (you can also provide the documentation in scss and change the `markup` key in the styles to point to the templates relative to your component's KSS block .)

## Component Libraries
Theoretically any component library/ or frontend framework can be documented via Kalastatic's KSS documentation. Note that to be useful in production the templates would need to be wired up with variables beyond static content.

We've created component libraries, one for Bootstrap and the other for US Web Design Standards. They are for documentation only at the moment, since they do not include twig-variables to be integrated into CMSs or mock data via JSON.

### KSS - Bootstrap
[Bootstrap KSS Pattern Library](https://github.com/kalamuna/kss-bootstrap)


### KSS - USWDS
[US Web Design Standards KSS Pattern Library](https://github.com/kalamuna/kss-uswds)
