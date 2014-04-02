'use strict';
define(function(require, exports, module) {
  var Phaser = require('phaser');
  var WarpedSound = function(game, key, volume, loop) {
    Phaser.Sound.call(this, game, key, volume, loop);
    game.sound._sounds.push(this);
  };

  WarpedSound.prototype = Object.create(Phaser.Sound.prototype);
  WarpedSound.prototype.constructor = WarpedSound;
  
  module.exports =  WarpedSound;
});


