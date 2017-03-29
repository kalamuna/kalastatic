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
- Twigshim module
- How do I set up the variable mapping
- Kalaponents + ¶ == component based workflow
- If you make use of Kalaponents’ “Component” Paragraphs bundle, it takes care of mapping the basic Drupal fields to their template counterparts:
	- title
	- text
	- image.src
	- link.text
	- link.url
- If you need to make additional adjustments to the variables, implement hook_kalaponents_data_alter().
- If you want to adjust the markup returned from Twig (e.g., to wrap the output in a section), implement hook_kalaponents_markup_alter().
- When sending other theme output through twigshim_render() (e.g., other Paragraph bundles, blocks, node templates), you must set up the Twig template variables manually and pass them in to twigshim.

## Drupal 8

While KalaStatic is a standalone application, you can integrate it quite well with Drupal 8. To have Drupal 8 use templates and components from KalaStatic, consider the following...

### Components module

The [Components module](https://www.drupal.org/project/components) will allow Drupal and Twig to share the same `@kalastatic` namespace. Once the module is installed, add the following to your theme's `.info.yml` file:

```
component-libraries:
  kalastatic:
    paths:
      - path/to/kalastatic/src
```

This will allow the theme to reference Twig templates like:
```
{% include "@kalastatic/components/molecules/button/button.twig" %}
```

### Template Inclusion

Once the Components module is set up, you can start including templates from KalaStatic in your Drupal theme. In some cases, components may require special naming for the variables. In this case you would use the [`include with` keyword](http://twig.sensiolabs.org/doc/2.x/tags/include.html).

An example of this would be in your theme's `page.html.twig` file. To include a button component with the title being the page title:

```
{% include "@kalastatic/components/molecules/button/button.twig" with {title: page.title} only %}
```

### Drupal Filters

Drupal 8 comes with a few handy Twig filters. While these are not provided by default in KalaStatic, you can make them available to the protoype.

1. Install [Twig.js Drupal Extensions](https://github.com/kalamuna/twig-drupal-filters)

    npm i twig-drupal-filters --save

2. Add the filter definitions you need to `kalastatic.yml`

```
# Allows changing some of the plugin options.
pluginOpts:
  metalsmith-jstransformer:
    engineOptions:
      # Twig options.
      twig:
        # Add Drupal 8's Twig filters.
        filters:
          clean_class: twig-drupal-filters/filters/clean_class
          safe_join: twig-drupal-filters/filters/safe_join
          t: twig-drupal-filters/filters/trans
```

## Deployment
- Circle?
- Travis?
