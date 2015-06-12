/**
 * Grunt Task Runner
 *
 * This is simply to facilitate local development. To build any files, use the
 * according Metalsmith plugin.
 */

module.exports = function(grunt) {
  // Create the Grunt configuration
  var config = {
    // Load data from package.json
    pkg: grunt.file.readJSON('package.json'),

    // Execute Metalsmith
    exec: {
      build: {
        cmd: 'npm run build'
      }
    },

    // Local static web server
    connect: {
      server: {
        options: {
          base: 'build',
          open: true,
          livereload: true
        }
      }
    },

    sass: {
      options: {
        includePaths: [
          "src/styles",
          "assets/vendor/bootstrap-sass-twbs/assets/stylesheets",
          "assets/vendor/fontawesome/scss"
        ]
      },
      dev: {
        options: {
          outputStyle: "nested",
          sourceComments: true,
          sourceMap: true
        },
        files: {
          'build/styles/main.css': 'assets/styles/main.scss'
        }
      },
      dist: {
        options: {
          outputStyle: "compressed",
          sourceComments: false,
          sourceMap: false
        },
        files: {
          'build/styles/main.css': 'assets/styles/main.scss'
        }
      }
    },

    // Watch files and run tasks when changed
    watch: {
      all: {
        files: [
          'src/**/*',
          'assets/**/*',
          'templates/**/*'
        ],
        tasks: ['metalsmith','sass:dev'],
        options: {
          spawn: false,
          interupt: true,
          livereload: true
        }
      }
    },

    // The Build Control plugin:
    // https://www.npmjs.com/package/grunt-build-control
    buildcontrol: {
      options: {
        dir: 'build',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      github: {
        options: {
          remote: 'git@github.com:<%= pkg.extra.repo %>.git',
          branch: 'gh-pages'
        }
      },
      deploy: {
        options: {
          remote: '<%= pkg.extra.deploy %>',
          branch: 'master'
        }
      }
    }
  };

  // Allow deploying to different multi-dev environments on Pantheon.
  if (process.env.TRAVIS_PULL_REQUEST == 'false' && process.env.TRAVIS_BRANCH == 'master') {
    config.buildcontrol.deploy.options.branch = process.env.TRAVIS_BRANCH;
  }
  else if (process.env.TRAVIS_PULL_REQUEST && process.env.TRAVIS_PULL_REQUEST != 'false') {
   config.buildcontrol.deploy.options.branch = 'pr-' + process.env.TRAVIS_PULL_REQUEST;
  }

  // Extract any keys from the environmental variables.
  if (process.env.GH_TOKEN) {
    // Update the remote git repository to use the GitHub token.
    config.buildcontrol.github.options.remote = "https://" + process.env.GH_TOKEN + "@github.com/<%= pkg.extra.repo %>.git";
  }

  // Initialize the configuration.
  grunt.initConfig(config);

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build', ['exec:build','sass:dist']);
  grunt.registerTask('deploy', ['buildcontrol:deploy']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};
