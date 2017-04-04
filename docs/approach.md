# Approach Focus and Direction
We should come to broad agreements as to what use cases we're serving, map-out some conventions and generally create a document we can refer back to for guidance in the process.

### Use Case A  
a Pattern Libary for content strategy, design and iterative frontend development.
If we define and revise html templates for common reusable components and patterns via .templates/partials/partialName.html transfer the same markup to the corresponding src/styles/components/_partialName.scss as KSS documentation we can be moving rather quickly on projects to come.
In a sci-fi ideal world three-to-six months time in the future, I would like to pull in kalastatic, edit sitedef.yaml
```
metadata
  title: a Title
  something
    key: value
    key:value
collections
  collectionA
    pattern: "pattern"
    sortBy: order
site
  - pageName
    - componentName
      key: value
      key2: value
      key3: value
      content: Lorem ipsum
      loop: collectionKey
    - anotherComponent
      key: value
      key2: value
      key3: value
      content: Lorem ipsum
   - anotherPage...
assets
  - folder_name
  - folder_name
```
And it would scaffold out a site, with the partials and includes in place, the assets folder scaffolded and metalsmith.json with a styleguide, and prototype ready.


Yeoman could probably do a lot of this sort of thing.
Here's a metalsmith project scaffolding example that does soemthing quite simple https://github.com/segmentio/metalsmith/tree/master/examples/project-scaffolder

Here are is some documentation of some such patterns, we can build a whole ready to use library:
https://drive.google.com/folderview?id=0B6sweyW2_IqFU1FaT2xldU1mTGM&usp=sharing


### Use Case B
A presentation frontend for a headless drupal 8 site that outputs json — Just sayin'
