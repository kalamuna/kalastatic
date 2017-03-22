# Cache Busting
Using [metasmith-swig-helpers](https://www.npmjs.com/package/metalsmith-swig-helpers)
We bust the cache as follows
```{{'/imags/kitty.jpg'|bustcache}}```
```{{'/js/scripts.js'|bustcache}}```

this appends the ms since unix epoch to the query string effectively busting the cache.
