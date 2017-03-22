# Twig

This documents some of the fancy things you can do with Twig.

## Extending Filters

Add a `filters.metadata` file in the src directory....

``` md
---
slug: kalastatic-twig-filters/lib/filters/slug.js
---

These are a list of Twig Filters that are applied to Twig. The key represents the name of the filter, and the value represents the Node.js module location.

IE `slug` is available from the kalastatic-twig-filters module.
```
