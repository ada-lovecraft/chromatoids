// Generated on 2014-03-28 using generator-phaser-official 0.0.8-rc-2
'use strict';
var moment = require('moment');
var config = require('./config.json');
var _ = require('underscore');
_.str = require('underscore.string');

// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
 
module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
  grunt.initConfig({
    watch: {
      scripts: {
        files: [
            'game/**/*.js',
            '!game/main.js'
        ],
        options: {
          spawn: false,
          livereload: LIVERELOAD_PORT
        },
        tasks: ['build']
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.')
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    htmlbuild: {
      dist: {
        src: 'templates/_index.html.tpl',
        dest: 'index.html',
        options: {
          scripts: {
            phaser: 'bower_components/phaser-official/build/phaser.js',
            gameStates: 'game/states/*.js',
            gamePrefabs: 'game/prefabs/*.js',
            gameBootstrapper: 'game/main.js'
          }
        }
      }
    },
    copy: {
      prod: {
        files: [
          // includes files within path and its sub-directories
          { expand: true, src: ['assets/**'], dest: 'public/' },
          { expand: true, src: ['bower_components/**/build/*.js'], dest: 'public/' },
          { expand: true, src: ['css/**'], dest: 'public/' },
          { expand: true, src: ['game/**'], dest: 'public/' },
          { expand: true, src: ['index.html'], dest: 'public/' }
        ]
      }
    }
  });
  
  grunt.registerTask('build', ['htmlbuild', 'buildBootstrapper']);
  grunt.registerTask('serve', ['build', 'connect:livereload', 'open', 'watch']);
  grunt.registerTask('default', ['serve']);
  grunt.registerTask('prod', ['build', 'copy']);

  grunt.registerTask('buildBootstrapper', 'builds the bootstrapper file correctly', function() {
    var stateFiles = grunt.file.expand('game/states/*.js');
    var gameStates = [];
    var statePattern = new RegExp(/(\w+).js$/);
    stateFiles.forEach(function(file) {
      var state = file.match(statePattern)[1];
      if (!!state) {
        gameStates.push({shortName: state, stateName: _.capitalize(state) + 'State'});
      }
    });
    config.gameStates = gameStates;
    console.log(config);
    var bootstrapper = grunt.file.read('templates/_main.js.tpl');
    bootstrapper = grunt.template.process(bootstrapper,{data: config});
    grunt.file.write('game/main.js', bootstrapper);
  });
};