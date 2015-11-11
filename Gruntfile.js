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
          base: 'build/',
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
        dir: 'build', // Which directory to deploy
        commit: true, // Only commit if code has changed
        push: true, // Push to remote
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      // GitHub Pages target: https://pages.github.com
      github: {
        options: {
          remote: 'git@github.com:<%= pkg.config.repo %>.git',
          branch: 'gh-pages'
        }
      },
      // The default deployment target, set in package.json.
      deploy: {
        options: {
          remote: '<%= pkg.config.deploy %>',
          branch: '<%= pkg.config.branch %>'
        }
      }
    }
  };

  // Deploy all branches to the same branch name. Pull Requests are already handled by this.
  if (process.env.TRAVIS_PULL_REQUEST == 'false' && process.env.TRAVIS_BRANCH) {
    // Branch switching is commented out until this is deployed.
    config.buildcontrol.deploy.options.branch = process.env.TRAVIS_BRANCH;
  }

  // Extract any keys from the environmental variables.
  if (process.env.GH_TOKEN) {
    // Update the remote git repository to use the GitHub token.
    config.buildcontrol.github.options.remote = "https://" + process.env.GH_TOKEN + "@github.com/<%= pkg.config.repo %>.git";
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
