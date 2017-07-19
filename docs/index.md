# Kalastatic

Kalastatic is a prototyping framework and static site generator.

### Featuring:
- Easy installation, with minimal dependencies
- Produces documented component library
- Output production ready styles that can be ingested by other systems
- Browsersync:
  - Built in webserver
  - Live reload - saving files reloads the browser
  - Remote device access - load your local on a mobile device!
- Node:
  - Automated download of front end frameworks and other dependencies
  - Automated Deployments
- Twig, or your template engine of choice:
  - Easy creation of extendable template variations with inheritance
- Convenience Utilities
  - Cache busting
  - Deep linking (url fragments)
  - Character limit filters
  - Splits CSS files for IE compatibility

At Kalamuna we use Kalastatic to put into practice atomic web design principles to produce a living styleguide/component library that can be used to guide back-end implementations in a framework-agnostic approach.

It integrates tightly with Drupal 7 and 8, effectively sharing twig templates between the styleguide, prototype and the CMS.

Kalastatic serves as a point of convergence between front-end development, back-end development, and content strategy. Ultimately it facilitates putting design first, and this in front users for testing, and stakeholders for meaningful and timely feedback.


## Overview

## Benefits
### Stakeholders
#### Clients
- Small uncertainties in communication get ironed out much earlier.
- Real, demonstrable progress happens early.
- Many concerns can be addressed during the project, instead of waiting for certain milestones.
- The whole process becomes more participatory.

#### Agency, PMs, Account Managers
- The client never sees a barebones generic site during demos.
- From first contact, their branding, typography and colors are in place. This avoids uncertainty, stress and education.
- Specific client feedback happens earlier on assets that are cheaper to fix as a prototype than a back-end build.

#### User Experience
- We can test assumptions with stakeholders earlier.
- We can "show not tell" more effectively.
- It's easier to communicate with stakeholders about abstractions when we are looking at something concrete.

#### Frontend Dev
- Can work in tools commonly used in the trade.
- Now in control of markup, as opposed to working around it.
- Can be involved earlier, and stick around later in the process.
- We begin working through responsive issues as soon as we begin styleguiding, this results in more successful first passes, less suprises, and better decisions about our responsive/adaptive patterns.

#### Content Strategist
- Doesn't have to wait for the CMS to be in place to see content in-situ.
- Integrations with third party content staging systems like [prismic](https://prismic.io) [gathercontent](https://gathercontent.com)

#### Backend developers
- Documented components can clarify implementation needs in code conversation with the front-end team.
- Json mock data tells me what needs to be made available to templates.


## Features

### Styleguide

#### What's a styleguide?

A web Styleguide offer a way of ensuring consistency between brand, design and code.
Herein we are looking documenting every component and its code on the site in one place to ensure "same-pagey" communications between designers, front end developers and developers.

The pattern portfolio expresses every component and layout structures throughout the site.
It articulates the atomic design structure, and is used to illustrate the project’s shared vocabulary.

#### The Kalastatic Styleguide
Website styleguides serving both as pattern library, but can also be serve as brand styleguide, to ensure consistency and conformancy in the use of brand assets. The styleguide not only ensures that new front end development can follow established patterns, but also facilitates the creation of on brand ancillary digital properties. Its compiled CSS and JS assets can be referenced and cosumed by third party services as well to create harmonious expressions across multiple systems.

Kalastatic uses [kss-node](https://github.com/kss-node/kss-node) as the basis for its styleguide.

Kalastatic uses the [KSTAT-KSS-Builder](https://github.com/kalamuna/kstat-kss-builder) to generate the styleguide, which extends some of the documenation features to make it better suited for documenting colors, and other brand-related style concerns.



### Prototype

To provide working, responsive prototypes, we use [metalsmith](metalsmith.io) and a bevvy of [other tools](https://github.com/kalamuna/kalastatic/blob/master/package.json)

Prototyping is most useful to consider the components with layouts, side by side with other elements. Where the styleguide documents components in isolation, prototyping helps us see all the bits in context, and even develop behaviors (js) and other integrations, before we dive into CMSs and app-frameworks.

Prototypes can be created at will, and draw upon the family of defined components in the system to build out pages, complete with custom content.
