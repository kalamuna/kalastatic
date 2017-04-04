# Javascript Module Pattern

## This article is deprecated, we've switched to browserify.



We currently use the following pattern on many pages, specially for reusable code:

### Module pattern
```
(function(moduleName,$,window,undefined){
…
}( window.moduleName = window.moduleName || {}, jQuery, window, undefined ));
```

[Here's an interesting article about that](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html)

Each module is its own file (eg. 'about.js') and the filename is the lowercase version of the module name, (so 'about.js' represents 'siteName.about' ), keeping any individual file legible and compartmentalized, and although were polluting the namespace, we're doing so responsibly. This may all change as we get into packing our frontend javascript differently (say using browserify, webpack or duo).

Passing window and undefined as arguments has the benefit of replacing those variables when uglified, ('a' < 'window') shaving off a few bytes here and there, improving UX, saving bandwidth, etc.

### Reusable code
Frequently used reusable code goes into 'static function' in the kala namespace here: https://github.com/kalamuna/kalastatic/blob/master/src/js/kala_utils.js

### OOP
Within the module, its sometimes desirable to work with object oriented code.
This helps readability and maintainability, but isn't required.
It also allows you to call methods from within the Class' scope using the 'this' keyword (eg. this.doSomething())
And the following pattern seems to work well:

```

(function(moduleName,$,window,undefined){

  kalaStatic.About = function() {
    this.doSomething();
  }

  /*
   * Assigning p to the Modules prototype just makes for less
   * typing. It results in smaller files and, so long as we
   * keep to one module per file, there should be no problem.
   */

  var p = kalaStatic.About.prototype;
  p.contructor = kalaStatic.About;

  p.doSomething = function(){
    console.log('doing that thing');
  }

  p.doAnotherThing = function(){
    console.log('doing something else');
  }

  /*
   * We're putting our JS at the bottom of the HTML these days
   * so $(document).ready isn't strictly necessary, but maybe
   * best practice.
   */
  $(document).ready(function() {

  /*
   * For js that we only want to instantiate on certain pages,
   * we make sure the body tag has the corresponding class name
   * This is a kalastatic html.html convention:
   * <body class="{% if page_slug %}{{page_slug}}{% else %}{{title|slug}}{% endif %}">
   * In this case we're assuming the src/about.md has page_slug
   * defined in the frontmatter as 'page-about'.
   */
  if( $("body").hasClass('page-about') ){
    kalaStatic.about = new kalaStatic.About();
  });

}( window.kalaStatic = window.kalaStatic || {}, jQuery, window, undefined ));

```
