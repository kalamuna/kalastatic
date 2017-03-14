# Collections
## Adding collections
To define a new collection you first need to edit metalsmith.json and add a new item to the metalsmith-collections array inside the plugins array.

```
  "plugins": {
    "metalsmith-collections": {
      "articles": {
        "pattern": "collections/articles/*.md",
        "sortBy": "order"
      }
    }
  }
```

The pattern should be the path to the folder containing your markdown files and then the files to search for. e.g. \*.md will find all markdown files.

We should establish—and follow—usage conventions.
In the case of collecitons we should use folders and nesting over filenames to build our collections
Yes: collecitons/artists/bios/\*.md
No: collections/artist-bio-\*.md

## Creating a listing from a collection
Create your collection (we like to let the folder structure do the filtering)

In your metalsmith.json
```
    "metalsmith-collections": {
      "articles": {
        "pattern": "collections/articles/*.md",
        "sortBy": "order"
      }
    }
```

Set up your md files:

```
---
title: A Title Here
permalink: false
order: 1
---

Lorem ipsum here...
```

(if we rely on using {{title|slug}} we can avoid extra slug keys in our frontmatter... )

and in our template html

```
    <section class="cool-things">
      <div class="teasers">
      {% for article in collections.articles %}
        {% include "./partials/teaser.html" with article only %}
      {% endfor %}
      </div>
    </section>
```

The partial ./partials/teaser.html
```
<article class="teaser">
  <div class="wrapper">
    <div class="photo">
      <img data-src="holder.js/200x100/#222:#aaa/text:{{article.title|slug}}">
    </div>
    <h3>{{title}}</h3>
    <p>{{contents|safe}}</p>
  </div>
</article>
```
Note the use of "with article only" which passes just that object to the template (reducing memory overhead) it also allows one to access subkeys directly (so {{title}} not {{article.title}}) in the partial:

## Using collections to create page content blocks

The Metalsmith plugin one would thing to use for including content partials: https://www.npmjs.com/package/metalsmith-include
is broken, don't use it!

We can leverage collections to do this somewhat cleanly:

In your metalsmith.json, create a collection you want your contentblock to live in:
```
      "aboutPageIntroBlock": {
        "pattern": "partials/about-content-blocks/aboutPageIntroBlock.md",
      }
```

in your partial (eg. ./partials/generic-copy-block.html):
```
<div classs="copy-block generic">
 <h3 class="block-title">{{title|safe}}</h3>
 <p class="content">
   {{contents|safe}}
 </p>
</div>
```

in your template (eg ./templates/about.html):
```
  {% for key, block in collections.aboutPageIntroBlock %}
    {% include "./partials/generic-copy-block.html" with block only%}
  {% endfor %}
```

Note the "with block only" in the template, this passes only the needed variables to the template, reducing memory overhead and buildtimes, it also means that the partial should access variables directly (that is to say: {{title|safe}} instead of {{block.title|safe}}.
