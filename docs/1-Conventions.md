# Conventions
## Directory structure
## Base directory
## Kalastatic.yaml
## Template Engines
Twig, pug, Mustache?
## Structures

### Conventions
It's easier to collaborate if we share a vocabulary.
Here are some conventions we've found useful for maintaining parallel development.

#### Text nodes

```
  "text": "A text node"
```

#### Head tags

```
  "title": "Água Viva"
```

#### Links
```
  "link": {
    "text": "Água Viva, by Clarice Lispector",
    "url": "https://en.wikipedia.org/wiki/Clarice_Lispector#.C3.81gua_Viva"
  }
```

##### Iterables

A series of Links

```
"items": [
  {
    "text": "Água Viva",
    "url": "https://en.wikipedia.org/wiki/Clarice_Lispector#.C3.81gua_Viva"
  },
  {
    "text": "Where Were You at Night and The Via Crucis of the Body",
    "url": "https://en.wikipedia.org/wiki/Clarice_Lispector#Where_Were_You_at_Night_and_The_Via_Crucis_of_the_Body"
  }
]
```

#### Images

Images can be simple…

```
"image": {
  "src": "/kalastatic/images/image_name.jpg"
}
```

or quite complex:

```
{
  "src": "http://placehold.it/450x325",
  "width": "450",
  "height": "325",
  "alt": "this is some alt text",
  "srcset": {
    "(max-width: 479px)": {
      "1x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ],
      "2x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ]
    },
    "(min-width: 480px) and (max-width: 767px)": {
      "1x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ],
      "2x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ]
    },
    "(min-width: 768px) and (max-width: 991px)": {
      "1x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ],
      "2x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ]
    },
    "(min-width: 992px) and (max-width: 1199px)": {
      "1x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ],
      "2x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ]
    },
    "(min-width: 1200px)": {
      "1x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ],
      "2x": [
        "http://placehold.it/450x325",
        "http://placehold.it/900x650"
      ]
    }
  }
}

```

## Collections
## Navigation
 how we do it with the built in tools e.g. metadata file and looping with twig.
Includes (partials)

## Includes (partials)
## Layouts
### Extending (engine specific)
## Ingesting assets from node packages
### Sass  IncludePaths
## .metadata files
## .assets files
## Twig filters
- Bustcache
- Slug
- Drupal filters
