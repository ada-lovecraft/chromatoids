'use strict';
define(function(require, exports, module) {
  
  var BasicEnemy = require('prefabs/basicEnemy');
  var SliderEnemy = require('prefabs/SliderEnemy');
  var SeekerEnemy = require('prefabs/SeekerEnemy');

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
    UP: {
      color: exports.Colors.YELLOW,
      velocity: {
        x: 0,
        y: -1
      }
    },
    RIGHT: {
      color: exports.Colors.GREEN,
      velocity: {
        x: 1,
        y: 0
      }
    },
    DOWN: {
      color: exports.Colors.RED,
      velocity: {
        x: 0,
        y: 1
      }
    },
    LEFT: {
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