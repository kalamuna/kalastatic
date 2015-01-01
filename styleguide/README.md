# Styleguide

[KSS-Node](http://kss-node.github.io/kss-node/) builds this styleguide using two
symlinks to different locations where the styleguide contents are found.

1. `bootstrap-styleguide`: Provides styleguides for Bootstrap components.
2. `styles`: Provides the styleguide components provided from `src/styles`.

This is set up with symlinks because KSS-Node does not yet support multiple
sources. Get involved in [Multiple Source Directories issue](https://github.com/kss-node/kss-node/issues/136)
to help push this feature forwards so that we don't need to use the Symlink
solution.
