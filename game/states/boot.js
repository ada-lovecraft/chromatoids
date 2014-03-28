var BulletTypes = Object.freeze({
  UP: {
    color: 'yellow',
    velocity: {
      x: 0,
      y: -1
    }
  },
  RIGHT: {
    color: 'green',
    velocity: {
      x: 1,
      y: 0
    }
  },
  DOWN: {
    color: 'red',
    velocity: {
      x: 0,
      y: 1
    }
  },
  LEFT: {
    color: 'blue',
    velocity: {
      x: -1,
      y: 0
    }
  },
  DEFAULT: {
    color: 'white',
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
}());