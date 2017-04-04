# Integrations
## Wordpress (or other integrations)
## Drupal
### Loading components from npm or composer packages
### How do I use the json mock data to populate a component? Check out this example gist.
### How to write Drupal behavior friendly js and have it work in kalastatic styleguides and prototypes.
### Kalastatic.module
- Where does kalastatic live?
- Including of Drupal assests
- Serving KS through drupal 
	- Permissions for styleguide/prototype

## Drupal 7
### Using twig in D7

[Twigshim](https://github.com/kalamuna/twigshim) is a small helper 
[module](https://www.drupal.org/docs/7/extending-drupal-7/installing-contributed-modules) 
for [Drupal 7](https://www.drupal.org/drupal-7.0) that pulls in
[Symfony](https://symfony.com/)'s [Twig](http://twig.sensiolabs.org/) library 
via [Composer](https://getcomposer.org/). It is an "API module", which means it 
doesn't do anything on its own; it just exposes a `twigshim_render()` function 
that accepts a Twig template file path and an array of template variables.
Developers can use this function to bypass Drupal's standard render pipeline and 
leverage Twig templates instead. There are various ways you can hook into the 
render pipeline and override it. The most common way is to define or override a 
[theme 
implementation](https://api.drupal.org/api/drupal/includes%21theme.inc/function/theme/7.x)
at the level of nodes, fields, blocks, or anything else 
([Paragraph](https://www.drupal.org/project/paragraphs) entities are an 
increasingly popular way of chunking up the editorial content creation 
experience).

Before rendering a Twig template, you've got to prep the template variables.
Typically, you do that in the same context where you call
`twigshim_render()`, passing in a fully formed set of data for use in the 
template. However, there's another helper module called 
[Kalaponents](https://github.com/kalamuna/kalaponents) that automates some of 
the work for you. It provides a basic Paragraphs bundle that represents a 
flexible component type. Kalaponents processes the field data and passes it into 
the Twig template you specify on the admin configuration page. This all adds up 
to a high velocity / low overhead approach to "componentising" your page 
content, and makes it "cheap" to generate new components in Drupal. Kalaponents
takes care of mapping these basic Drupal fields to their template counterparts:

-   title
-   text
-   image.src
-   link.text
-   link.url

Kalaponents also provides a few hooks if you need to make adjustments along the 
way. Implement `hook_kalaponents_data_alter()` if you want to modify the 
template variables before they're passed on to Twig. And implement 
`hook_kalaponents_markup_alter()` if you want to adjust the markup returned from 
Twig (e.g., to wrap the output in a section).

## Drupal 8
### Components module
- Twig namespaces
- How do I set up the variable mapping - theme functions etc
- JS version of Druapl specfic Twig filters are included 

## Deployment
- Circle?
- Travis?
