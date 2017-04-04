# Directory Structure

```
kalastatic
    ├─ bower.json
    ├─ Gruntfile.js
    ├─ kss-node.json
    ├─ LICENSE
    ├─ metalsmith.json
    ├─ package.json
    ├─ README.md
    ├─ assets // where we're sticking
    ├─ build // metalsmith builds here, node-connect serves from here
    |  ├─ styleguide
    |  ├─ assets // moved into build by metalsmith-assets
    |  |  ├─ images
    |  |  ├─ fonts
    |  |  ├─ styles
    |  |  └─ vendor // this is where we redirect bower components
    |  └─ … // other proto buildout
    ├─ src
    |  ├─ components // potentially holds, do we need pages here
    |  |  ├─ atoms
    |  |  ├─ molecules
    |  |  └─ organisms
    |  ├─ styles // mostly whats here: https://github.com/kalamuna/sass-boilerplate/tree/master/template
    |  └─ content // *.md files go here in their own structure.     
    |  └─ config // *.metadata files go here.   
    |  |  └─ config.metadata // handy variables in yaml
    |  |  └─ navigation.metadata // nav structures in yaml
    |  └─ js // js!
    └─ templates // specific pages
       └─ layouts // a big pile of all the things
       └─ pages // a big pile of all the things
```
