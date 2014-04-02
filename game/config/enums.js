'use strict';
define(function(require, exports, module) {
  
  var BasicEnemy = require('prefabs/basicEnemy');
  var SliderEnemy = require('prefabs/sliderEnemy');
  var SeekerEnemy = require('prefabs/seekerEnemy');

  exports.Colors = Object.freeze({
    YELLOW: 'yellow',
    GREEN: '#2aff57',
    RED: 'red',
    BLUE: '#2ab1ff',
    GREY: '#cccccc',
    WHITE: 'white'
  });

  exports.EnemyTypes = Object.freeze({
    BASIC: BasicEnemy,
    SLIDER: SliderEnemy
  });

  exports.BulletTypes = Object.freeze({
    YELLOW: {
      color: exports.Colors.YELLOW,
      velocity: {
        x: 0,
        y: -1
      }
    },
    GREEN: {
      color: exports.Colors.GREEN,
      velocity: {
        x: 1,
        y: 0
      }
    },
    RED: {
      color: exports.Colors.RED,
      velocity: {
        x: 0,
        y: 1
      }
    },
    BLUE: {
      color: exports.Colors.BLUE,
      velocity: {
        x: -1,
        y: 0
      }
    },
    DEFAULT: {
      color: exports.Colors.GREY,
      velocity: {
        x: 0,
        y: 0
      }
    },
    CHROMATIC: {
      color: exports.Colors.WHITE,
      velocity: {
        x: 0,
        y: 0
      }
    }
  });
});