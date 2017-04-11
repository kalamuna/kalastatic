# Integrations
## Wordpress (or other integrations)
## Drupal
### Loading components from npm or composer packages
### How do I use the json mock data to populate a component? Check out this example gist.
### How to write Drupal behavior friendly js and have it work in kalastatic styleguides and prototypes.
### Kalastatic.module
- Where does kalastatic live?
- Including of Drupal assests
- Serving KalaStatic assets through Drupal
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

While KalaStatic is a standalone application, it can be integrated with Drupal 8. This allows the use of KalaStatic templates and components from Drupal, giving a Drupal site a living prototype and styleguide. To have Drupal 8 use templates and components from KalaStatic, consider the following...

### Components Module

The [Components module](https://www.drupal.org/project/components) will allow Drupal and Twig to share the same `@kalastatic` namespace, making including KalaStatic Twig templates a lot easier.

1. Install the Components module
2. Add the following to your theme's `.info.yml` file:

```
component-libraries:
  kalastatic:
    paths:
      - path/to/kalastatic/src
```

3. Teference Twig templates from KalaStatic using `@kalastatic`:

```
{% include "@kalastatic/components/molecules/button/button.twig" %}
```

### Template Inclusion

Once the Components module is set up, you can start including templates from KalaStatic in your Drupal theme. In some cases, components may require special naming for the variables. In this case you would use the [`include with` keyword](http://twig.sensiolabs.org/doc/2.x/tags/include.html).

An example of this would be in your theme's `page.html.twig` file. To include a button component with the title being the page title:

```
{% include "@kalastatic/components/molecules/button/button.twig" with {title: page.title} only %}
```

See the [Components section](3-components.md) for more information on using components.

### Drupal Filters

[Twig Filters](http://twig.sensiolabs.org/doc/2.x/filters/index.html) allow modifying the variables before they're output to the page. The [Drupal 8 Twig Filters](https://www.drupal.org/docs/8/theming/twig/filters-modifying-variables-in-twig-templates) add a few more Drupal-specific filters. While these are not provided by default in KalaStatic, you can make them available to the prototype.

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
