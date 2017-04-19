# Project Configuration

This page seeks to document the spaces where project and environmental configurations occur.

When a new site is spawned, certain elements require more persistent modification. Let's define these broadly as **configurations**. Some updated settings in the project once given life too can be referred to as **preferences**.

In the code base, per-subsystem configurations occur. A longer term automation strategy would seek to acknowledge this project as an Application an provide a single configuration file to rule them all. 'Till then, we inventory.


## package.json
- sets the project name
- declares dependencies for packages installed via npm
-- to build the project content  and styleguide
-- to perform development tasks on the site
-- defines metalsmith plug-ins
- defines scripts executed via npm like _build_, _test_, and _styleguide

## pa11y.json
Configures how accessibility checks will be done through [pa11y](http://pa11y.org). In addition to [the standard configuration](https://github.com/springernature/pa11y#configuration), there is also:

### pages:
An array of pages that will be scanned for accessibility when building.

### Example
``` json
{
  "standard": "WCAG2AA",
  "pages": [
    "index.html"
  ]
}
```

## bower.json
manages front-end dependencies

## metalsmith.json
configures variables for metalsmith and its plug-ins

- defines collections
- sets directory destinations for css+js output
- defines asset location


## .travis.yml
> Variables in the .travis.yml are bound to a certain commit. Changing them requires a new commit, restarting an old build will use the old values. They will also be available automatically on forks of the repository.

_see http://docs.travis-ci.com/user/environment-variables/#Variables-in-the-.travis.yml for more info_


## Environmental Variables

The [Metalsmith Env](https://github.com/kalamuna/metalsmith-env) plugin is in place, which will register all environmental variables in the template itself.

### Usage

1. Define them in either a build script like the following:

  ```
  export NODE_ENV=production
  export BASEURL="/kalastaticbase"
  ```
1. ... Or as part of the execution of running the program:
  ```
  NODE_ENV=production BASEURL="/kalastaticbase" npm test
  ```

1. See [metalsmith-env usage documentation](https://github.com/kalamuna/metalsmith-env#usage) for more information on its application in the template. The `BASEURL` example would become a `BASEURL` variable in the template.

1. Define any additional environmental variables in `package.json`. For example:
  ``` json
  "config": {
    "kstatic": {
      "drupalRemote": "/"
    }
  }
  ```
  Will become available as `npm_package_config_kstatic_drupalRemote`.
