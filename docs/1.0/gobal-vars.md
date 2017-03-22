# Sitewide (global) variables in config.yaml

config.yaml is where sitewide (global) variables live, it's a simple [yaml structure](http://docs.ansible.com/YAMLSyntax.html)

```
title: KalaStatic
description: Static site framework for prototyping and building out CMS-less websites at Kalamuna.
copyright: Copyright © 2015 <a href="http://kalamuna.com">Kalamuna, Inc</a>. All Rights Reserved.
```

Imagining this entry in config.yml

```
someObject
  - name: name
    link: alink
    blurb: aBlurb
    image: anImage/path.jpg
  - name: anotherName
    link: alink
    blurb: aBlurb
    image: anImage/path.jpg
```
we would iterate through that in the template as:

```
  {% for item in config.someObject %}
    <li class="{{itemname|slug}}">
      <a href="{{item.url}}">{{item.name}}</a>
      <p>{{item.blurb}}</p>
    </li>
  {% endfor %}
```
