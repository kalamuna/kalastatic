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
      },
    },

    // Local static web server
    connect: {
      server: {
        options: {
          base: 'build',
          open: true,
          livereload: true
        },
      },
    },

    // Watch files and run tasks when changed
    watch: {
      all: {
        files: [
          'src/**/*',
          'assets/**/*',
          'templates/**/*'
        ],
        tasks: ['build'],
        options: {
          spawn: false,
          interupt: true,
          livereload: true
        },
      },
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
          branch: 'prismic'
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

  grunt.loadNpmTasks('grunt-build-control');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['exec:build']);
  grunt.registerTask('deploy', ['buildcontrol:deploy']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};
