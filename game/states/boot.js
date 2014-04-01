var Colors = Object.freeze({
  YELLOW: 'yellow',
  GREEN: '#2aff57',
  RED: 'red',
  BLUE: '#2ab1ff',
  GREY: '#cccccc',
  WHITE: 'white'
});

var EnemyTypes = Object.freeze({
  0: {
    color: Colors.YELLOW
  },
  1: {
    color: Colors.GREEN
  },
  2: {
    color: Colors.RED
  },
  3: {
    color: Colors.BLUE
  },

});

var BulletTypes = Object.freeze({
  UP: {
    color: Colors.YELLOW,
    velocity: {
      x: 0,
      y: -1
    }
  },
  RIGHT: {
    color: Colors.GREEN,
    velocity: {
      x: 1,
      y: 0
    }
  },
  DOWN: {
    color: Colors.RED,
    velocity: {
      x: 0,
      y: 1
    }
  },
  LEFT: {
    color: Colors.BLUE,
    velocity: {
      x: -1,
      y: 0
    }
  },
  DEFAULT: {
    color: Colors.GREY,
    velocity: {
      x: 0,
      y: 0
    }
  },
  CHROMATIC: {
    color: Colors.WHITE,
    velocity: {
      x: 0,
      y: 0
    }
  }
});



(function () {
  'use strict';

  function Boot() {
  }

  Boot.prototype = {
    preload: function() {
      this.load.image('preloader', 'assets/preloader.gif');
    },
    create: function() {
      game.input.maxPointers = 1;
      game.state.start('preload');
    }
  };

  BootState = Boot;
})();