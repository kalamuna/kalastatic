# Styleguide

A [style guide](https://en.wikipedia.org/wiki/Style_guide) provides a means of documenting basic rules or features that will allow you to ensure consistency in the design. It makes your website look and read consistently, translating to a better user experience, higher usability and ultimately fulfils a website’s goals more effectively.

This styleguide uses [Knyle Style Sheets (KSS)](https://github.com/kneath/kss), "a documentation syntax for CSS" that's intended to have syntax readable by humans and machines. Hence, the kss-node software can be used to create a "living style guide".

1. Write human-readable documentation using "KSS syntax" comments. Can be added to CSS, Sass, LESS, or any other CSS Preprocessor files.
2. Have the kss tool automatically build a style guide from your stylesheets.

Here's an example KSS comment:
<pre class="prettyprint linenums lang-css"><code data-language="css">/*
Button

Your standard button suitable for clicking.

:hover   - Highlights when hovering.
.shiny   - Do not press this big, shiny, red button.

Markup: button.html

Style guide: components.button
*/
.button {
  ...
}
.button.shiny {
  ...
}
</code></pre>
