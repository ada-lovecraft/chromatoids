'use strict';

define(function(require, exports, module) {
  function Boot() {
  }

  Boot.prototype = {
    preload: function() {
      console.log('boot state');
      this.load.image('preloader', 'assets/preloader.gif');
    },
    create: function() {
      this.game.input.maxPointers = 1;
      this.game.state.start('preload');
    }
  };

  module.exports =  Boot;
});
  
