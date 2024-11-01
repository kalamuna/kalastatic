# Changelog

## 6.0.0-alpha6: 2024-10-29

- Complete rewrite without metalsmith, focusing on minimalism

## 5.0.0-alpha1: 2022-06-12

- Move from node-sass to normal sass

## 4.2.2: 2020-04-16

- Unlock version dependency on `kss`

## 4.2.1: 2020-04-16

- Moved documentation to https://kalamuna.github.io/kalastatic/
- Updated dependencies

## 4.2.0: 2019-01-24

- Update to `kss@3.0.0-beta.25`
- Remove debugging logs
- Allow injecting plugin options

## 4.1.0-alpha.3: 2018-10-29

- Environment overrides

## 4.1.0-alpha.2: 2018-08-29

- Update to [`kstat-kss-builder@2.0.0`](https://github.com/kalamuna/kstat-kss-builder)
- Update developer dependencies

## 4.1.0-alpha.1: 2018-07-04

- Update Twig with namespace fixes
  - Namespace definitions are now relative to the source directory

## 4.0.0-alpha.5: 2018-05-30

- Twig: Add `extend` fix ([#559](https://github.com/twigjs/twig.js/pull/559))

## 4.0.0-alpha4: 2018-04-23

- KSS: Target specific KSS version to keep tests in check

## 4.0.0-alpha3: 2018-04-17

- BrowserSync: Disable opening the window automatically

## 4.0.0-alpha2: 2018-03-11

- Enabled the BrowserSync directory index
- Documentation
- Updated dependencies
  - `jstransformer-pug@0.3.0`
  - `nconf@0.10.0`
  - `metalsmith-jstransformer@0.13.0`
- Fixed tests in Node.js 9

## 4.0.0-alpha1: 2017-12-12

- Switch to [KSTAT-KSS-Builder](https://github.com/kalamuna/kstat-kss-builder) for the Styleguide
- Add Clean URLs

## 3.2.0: 2017-05-31

- Added the Drupal 8 Twig extensions to KSS
- Added documentation
- Updated code standards to ES6
- Added a `create-component` command

## 3.1.2: 2017-02-23

- Updated to `kss@^3.0.0-beta.18`

## 3.1.1: 2017-02-23

- Added `@molecules`, `@atoms` and `@organisms` twig namespaces

## 3.1.0: 2017-02-08

- Added three new BrowserSync options:
  - `bsIndex`
  - `bsWebroot`
  - `bsBrowser`

## 3.0.1: 2017-01-12

- The `metalsmith-metadata-files` inherited files key is now `@kalastatic/`

## 3.0.0: 2017-01-10

- Added support for JSON content files in the prototype
- Updated to `kss@^3.0.0-beta.17`
- Added a global `build_path` variable

## 2.3.1: 2016-12-22

- Added an unhandled Promise exception check in `kalastatic start`

## 2.3.0: 2016-12-21

- Added `kalastatic start` to start a local development environment

## 2.2.4: 2016-12-19

- Update Twig

## 2.2.3: 2016-12-16

- Used engineOptions for Twig namespaces

## 2.2.2: 2016-12-16

- Updated dependencies, with engine-specific options

## 2.2.1: 2016-12-15

- Adds Twig Namespace support for KSS

## 2.2.0: 2016-12-15

- Introduces kalastatic.yaml kss->config file use
  - From @thiagodemellobueno

## 2.1.16: 2016-12-14

- Use strict

## 2.1.15: 2016-12-13

- Allow changing the KSS homepage

## 2.1.14: 2016-12-13

- Allow changing the KSS title

## 2.1.13: 2016-12-13

- Allow using a custom KSS Builder

## 2.1.12: 2016-12-05

- Fix process exit code on error

## 2.1.11: 2016-12-02

- Updated dependencies

## 2.1.10: 2016-12-01

- Updated dependencies

## 2.1.9: 2016-11-09

- Updated to `metalsmith@^2.3.0`
- Updated to `metalsmith-jstransformer@^0.8.0`
- Updated to `metalsmith-metadata-convention@^1.0.1`

## 2.1.8: 2016-11-03

- Update Twig

## 2.1.6: 2016-11-03

- Fix `metalsmith-jstransformer-layouts`

## 2.1.5: 2016-11-02

- Add `pluginOpts` config

## 2.1.4: 2016-11-02

- Add [`metalsmith-jstransformer-layouts`](https://github.com/RobLoach/metalsmith-jstransformer-layouts)

## 2.1.3: 2016-11-02

- Split `plugins` config from `pluginsOpts`

## 2.1.2: 2016-11-01

- Update dependencies and add Asset Management

## 2.1.1: 2016-11-01

- Add some error handling

## 2.0.1: 2016-10-07

- Added a `kssSource` configuration

## 2.0.0: 2016-07-13

- Moved into the [`kalamuna/kalastatic/2` branch](https://github.com/kalamuna/kalastatic/tree/2)

## 0.0.6: 2016-07-06

- Add Twig and SCSS engines

## 0.0.5: 2016-06-28

- Update dependencies to fix tests

## 0.0.4: 2016-06-17

- Small fixes
- KSS Styleguide

## 0.0.3: 2016-06-17

- Publish the project

## 0.0.2: 2016-02-06

- Update dependencies

## 0.0.1: 2015-07-08

- Initial release
