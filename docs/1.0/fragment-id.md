# Fragment Identifiers

In order to use fragment identifiers in the url you need to add a slash before the fragment. e.g.

Instead of:
```
<a href="/page#thing">
```

do it like this:
```
<a href="/page/#thing">
```

This is the result of the permalink plugin exporting pages as pageName/index.html as opposed to say pagename.html, so you need the slash before the fragment. Or you are putting a fragment on a directory, which doesn't do anything.
