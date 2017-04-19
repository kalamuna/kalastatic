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
### Using Twig in D7

[Twigshim](https://github.com/kalamuna/twigshim) is a small helper [module](https://www.drupal.org/docs/7/extending-drupal-7/installing-contributed-modules) for [Drupal 7](https://www.drupal.org/drupal-7.0) that pulls in [Symfony](https://symfony.com/)'s [Twig](http://twig.sensiolabs.org/) library via [Composer](https://getcomposer.org/). It is an "API module", which means it doesn't do anything on its own; it just exposes a `twigshim_render()` function that accepts a Twig template file path and an array of template variables. Developers can use this function to bypass Drupal's standard render pipeline and leverage Twig templates instead. There are various ways you can hook into the render pipeline and override it. The most common way is to define or override a [theme implementation](https://api.drupal.org/api/drupal/includes%21theme.inc/function/theme/7.x) at the level of nodes, fields, blocks, or anything else.

One increasingly popular approach uses [Paragraph](https://www.drupal.org/project/paragraphs) entities to chunk up the editorial content creation experience. It brings a component-friendly page-building technique to the CMS side of things, making it really straightforward to create one-to-one mappings between Kalastatic components and the CMS. Here's an example of how to integrate a Twig template with Paragraphs. Let's start with this markup:

```twig
<div class="container tout__image-left shadowbox__right text-center">
  <div class="row">
    <div class="col-sm-6 text-left">
      {% include "@kalastatic/components/atoms/image/image.twig" with image only %}
    </div>
    <div class="col-sm-6 block__body">
      <h3>{{ title }}</h3>
      <p>{{ text }}</p>
      {% include "@kalastatic/components/atoms/link/link.twig" with link only %}
    </div>
  </div>
</div>
```

As you can see, the template uses variables to render our desired content. [`hook_preprocess_HOOK()`](https://api.drupal.org/api/drupal/modules%21system%21theme.api.php/function/hook_preprocess_HOOK/7.x) is the standard way to adjust template variables in Drupal. But since these variables really won't get used by any other modules, we typically just prep them immediately before the call to `twigshim_render()`, passing in a fully formed set of data for use in the template. For example:

```php
/**
 * Overrides the theme function for the "Example" Paragraphs bundle.
 */
function mytheme_paragraphs_item__example(&$vars) {
  $template_path = 'molecules/tout__image_left/tout__image_left.html.twig';
  $template_vars = [];
  foreach (['title', 'text', image', 'link'] as $field) {
    $content = &$vars['content']["field_$field"];
    if (!empty($content)) {
      $template_vars[$field] = render($content);
    }
  }
  return twigshim_render($template_path, $template_vars);
}
```

And here's an example where we actually just pull our variable data directly from the component's JSON file defined in Kalastatic:
```php
/**
 * Overrides the theme function for the "Example" Paragraphs bundle.
 */
function mytheme_paragraphs_item__example() {
  $component = 'molecules/example/example';
  $file = kalastatic_path_to_kalastatic() . "/src/components/$component.json";
  $json = file_get_contents($file);
  $template_vars = drupal_json_decode($json);
  return twigshim_render("$component.html.twig", $template_vars);
}
```

Now let's throw one more wrinkle of complexity into this swirling vortex of fun. We've created a helper module called [Kalagraphs](https://github.com/kalamuna/kalaponents) that automates some of the work for you. It provides a basic Paragraphs bundle that represents a flexible component type. Kalagraphs processes the field data and passes it into the Twig template you specify in the admin configuration. This all adds up to a high velocity / low overhead approach to "componentising" your page content, and makes it "cheap" to generate new components in Drupal.

Kalagraphs takes care of mapping these basic Drupal fields to their template counterparts:

-   title
-   text
-   image.src
-   link.text
-   link.url

Kalaponents also provides a few hooks if you need to make adjustments along the way. Implement `hook_kalaponents_data_alter()` if you want to modify the template variables before they're passed on to Twig. And implement `hook_kalaponents_markup_alter()` if you want to adjust the markup returned from Twig (e.g., to wrap the output in a section).

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
