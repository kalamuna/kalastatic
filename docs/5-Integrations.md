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
### Components module
- Twig namespaces
- How do I set up the variable mapping - theme functions etc
- JS version of Druapl specfic Twig filters are included 

## Deployment
- Circle?
- Travis?
