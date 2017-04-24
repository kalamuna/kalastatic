# Styleguide

 A web Styleguide offer a way of ensuring consistency between brand, design and code.
 It's used to document the visual vocabulary of a project, from color and typography, to a comprehensive collection of a project's components, their, code, in one place to facilitate communications between designers, front end developers and developers. It allows us to get a unified 10,000 foot view of the project's visual elements, without getting caught in the weeds.  

## Why Styleguides?


## KSS basics
In essence KSS is a system for documenting site components.
Documentation lives in your [css/sass files](https://github.com/kss-node/kss-node#kss-node) and is parsed by kss into a styleguide.

### Anatomy of KSS comments

A common kss comment looks like this:

<code>
/*
button

A common button

Markup: button.twig

.active - The active state

Styleguide ui.button
*/
</code>

- The first line is a title.
- Below it description of the component.
- The markupo block is just a reference to the template file itself (kalastatic's kss implementation assumes twig)
- After that, each line represents a 'class modifier' so we represent style variations of the component in question.
- The "Styleguide" line represents where your component lives in the styleguide's  organizational structure, usually this goes two levels deep.

## Custom KSS builder

In order to prove a more usable, comprehensive, and aesthetically pleasing Styleguide we developed a custom [KSS builder](https://github.com/kalamuna/kstat-kss-builder). It offers cleaner styles, inherit's your site's base styles and offers additional brand-guide elements (colors swatches, type speciments).

## How do I document colors

Any ```Styleguide xx.xxxxxx``` section  containing the string 'color-swatches' will be processed as such. Here's an example from Kalamuna's own styleguide: [Kalamun a Brand Colors](https://blog.kalamuna.com/kalastatic/styleguide/section-color-swatches.html)

<code>
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
</code>


### Naming conventions

Althought neither Node-kss nor Kalastatic are agnostic to your naming conventions, we've found that splitting the styleguide into:
* Overview (this is the homepage.md file)
* Colors
* UI
* Content
* Media
* Navigation


### https://github.com/kalamuna/kstat-kss-builder/issues/15
## How do I create a top level section?
## How do I add a component to an existing section?
## How do I reorder items in a section
## JSON Mock data via .json files
## Adding additional js and css files to the styleguide
## Loading components from npm or composer packages
## Sweet styleguide template
## Component Libraries
### KSS - Bootstrap
### KSS - USWDS
