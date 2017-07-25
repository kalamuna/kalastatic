# Components

Component based approaches to web development have been around for some time, however more formalized systems like [Brad Frost's Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) have become more popular recently. Thinking about a web page as a system of discrete components enable us to approach building more granularly and maintain consistency across a whole project. The components are the building blocks that we craft sites with and maintiaining this approach allows us to use Kalastatic to quickly build out prototype pages and automagically generate a styleguide for your project.

In Kalastatic a component consists of a folder containing:

- **A SASS file**
	- All the styles that apply to this component.
- **A Twig template**
	- All the markup needed for the component
	- Twig logic and/or placeholder variables that will get populated with content on build.
- **A json file**
	- Dummy data used to populate the Twig template for the styleguide.
	- Can also be used to hold non-dummy static data like strings of text or images that won't get dynamically populated by other methods.

## How to add a new component

We suggest sorting your components into folders that demarcate their complexity based on [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/). However Kalastatic doesn't enforce this.

To create a new component, make a new folder inside the `components` directory. Let's use 'button' as an example.
Inside the `button` folder create three new files:

- `button.scss`
- `button.html.twig`
- `button.json`

### Create Component

We provide a handy command `create-component` or `cc` that takes care of some of generating these files (and soon providing boilerplate content for valid json, and pre-configured kss headers).

- Command: `kalastatic create-component <objectToCreate> [otherObjects...]`
- Alias: `kalastatic cc ...`
- Options: `kalastatic cc --directory=path/to/where/you/want/`

#### Usage

```
kalastatic cc atoms/links
kalastatic cc atoms/link
kalastatic cc --directory=path/you/want/the/files/to/go atoms/link atoms/button molecules/article-teaser
```

You can mass-produce components by using `cat`:

1. Add the following to a `components.txt` file:
    ```
    atoms/links
    atoms/buttons
    molecules/cta
    molecules/tout
    ```

2. Execute the following command:
    ```
    kalastatic cc --directory=path/you/want/the/files/to/go 'cat components.txt '
    ```

### Component Sass

Adding a KSS comment to the top of your component's Sass file will enable KSS to build out the styleguide including our new component.

```
/*

Button

A button for our website

Markup: button.html.twig

Styleguide content.button

*/
```

For more indepth documentation on KSS and it's conventions see [Styleguide](/3-Styleguide) TODO: make internal links work.

Add styles that are specific to this button component. We suggest using the fugly selector method because it promotes extensibility and reusability but this is not required by Kalastatic.

```
%button {
  padding: 2em 1em;
  background-color: $brand-primary;
  color: #fff;
  border-radius: 20px;
 }

 a.button,
 button,
 input[type=submit] {
   @extend %button;
 }
```

Now that our component's Sass file exists, it's now a good idea to include it from your `main.scss` so it's styles get included in the build.

```
@import '../components/atoms/button/button';
```

### Component Twig

Your component's Twig file contains the markup and variables/logic needed to display the component. For more information on this see the [Twig documentation](http://twig.sensiolabs.org/doc/2.x/)

```
<a href="{{ url }}" class="button {{ classes|join(" ") }}">{{ text }}</a>
```

#### Template Engine Extensions

The extension of the file determines what template engine to use. If the file extension is `.twig`, it will use Twig. If you use `.html`, it will see that the HTML is already processed, and will not use any template engine. Using `.html.twig` as the file extension will process the file with Twig as usual, but give an added benefit of allow the component to be consumed by the Drupal theme layer.

### Component json
The component's json file contains json data that is used to populate the variables in the Twig file. The top level keys should match the variable names in the Twig template. The Kalastatic build will fail if your json is not valid. Note that when you change json data, you need to stop and restart Kalastatic to see the changes come through in the browser. This is a known quirk that will get fixed in future versions.

```
{
  "text": "Click me, slowly.",
  "url": "page.html"
}
```

## How do you include another component?
Some components are made up of a collection of other components. Acheiving this in Twig is easy with the [include directive](http://twig.sensiolabs.org/doc/2.x/tags/include.html).

```
{% include 'template.html' with {'foo': 'bar'} %}

```


### When do you use only and why?
When including templates within other templates it's advisable to use the `only` declaration for passing variables.

```
{% include 'template.html' with var only %}

```

This is a form of dependecy injection that has a number of benefits:
- It saves memory
- Makes builds faster
- Keeps components self contained and therefore portable/reusable.

When the `only` directive is not used, the entire variable scope is passed to the template. While this may be needed/desirable in some cases it's generally considered bad practice.

## Extending components
A component can also use the Twig `extends` directive to extend a Twig `block`. For more information see the [Twig extends documentation](https://twig.sensiolabs.org/doc/2.x/tags/extends.html).
