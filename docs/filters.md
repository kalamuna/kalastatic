# Filters

General Swig filter documentation is here: http://paularmstrong.github.io/swig/docs/filters/
Swig Helpers: https://github.com/madeofpeople/metalsmith-swig-helpers
## Limit
We implement a custom swig filter that limits output to a certain length. This is useful for teasers and the like. It clips at the last period or space before the limit and appends an ellipsis (…)

It can be used in the following ways:
```
    // Defaults to 140 characters because Twitter.
    <p>{{contents|limit)}}</p>
```

```
    // Limit to a specific number of characters.
    <p>{{contents|limit(200)}}</p>
```

Note that you will probably want to use the `limit` filter in combination with the `safe` filter in order that markup gets rendered instead of printed out.

```
    // Usable with other filters.
    <p>{{contents|safe|limit(100)}}</p>
```
