/**
 * Grunt Task Runner
 *
 * This is simply to facilitate local development. To build any files, use the
 * according Metalsmith plugin.
 */

module.exports = function(grunt) {
  // Create the Grunt configuration
  var config = {
    // Execute Metalsmith
    exec: {
      metalsmith: {
        cmd: 'npm run build'
      },
      kss: {
        cmd: "npm run styleguide"
      }
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
        tasks: ['metalsmith'],
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
          remote: 'git@github.com:kalamuna/kalastatic.git',
          branch: 'gh-pages'
        }
      }
    }
  };

  // Extract any keys from the environmental variables.
  if (process.env.GH_TOKEN && process.env.GH_REPO) {
    // Update the remote git repository to use the GitHub token.
    config.buildcontrol.github.options.remote = "https://" + process.env.GH_TOKEN + "@github.com/" + process.env.GH_REPO + ".git";
  }

  // Initialize the configuration.
  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-build-control');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('metalsmith', ['exec:metalsmith', 'exec:kss']);
  grunt.registerTask('deploy', ['metalsmith', 'buildcontrol:github']);
  grunt.registerTask('default', ['metalsmith', 'connect', 'watch']);
};
