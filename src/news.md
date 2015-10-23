---
template: pages/news.html
title: News
pageSlug: news
prismic:
  news:
    query: '[[:d = at(document.tags,["test"])]]'
---

This is news from [Prismic](https://kalastatic.prismic.io), a nifty online content data store.

Content from primsic in the **news** collection is queried via the [prismic API](https://developers.prismic.io/documentation/api-documentation) against the tag **test** by the [metalsmith-prismic plug-in](https://github.com/mbanting/metalsmith-prismic) on every build.
