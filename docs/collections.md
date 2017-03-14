# Adding collections
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

The pattern should be the path to the folder containing your markdown files and then the files to search for. e.g. *.md will find all markdown files.

We should establish—and follow—usage conventions.
In the case of collecitons we should use folders and nesting over filenames to build our collections
Yes: collecitons/artists/bios/*.md
No: collections/artist-bio-*.md
