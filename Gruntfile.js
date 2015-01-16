/**
 * Grunt Task Runner
 *
 * This is simply to facilitate local development. To build any files, use the
 * according Metalsmith plugin.
 */

module.exports = function(grunt) {
  grunt.initConfig({
    // Execute Metalsmith
    exec: {
      metalsmith: {
        cmd: 'npm run-script build'
      },
      kss: {
        cmd: "npm run-script styleguide"
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
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-build-control');

  grunt.registerTask('deploy', ['build', 'buildcontrol:github']);
  grunt.registerTask('build', ['exec:metalsmith', 'exec:kss']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};
