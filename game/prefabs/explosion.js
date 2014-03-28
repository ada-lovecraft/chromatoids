'use strict';

var Explosion = function(game, x, y, color, particleSize, explosionSize) {
  this.color = color;
  this.explosionSize = explosionSize || 10;
  this.particleSize = particleSize;

  Phaser.Particles.Arcade.Emitter.call(this, game, 0, 0, 100);
  this.particleClass = Block
  this.gravity = 500;
  this.makeParticles(4,'white');
  

  
};

Explosion.prototype = Object.create(Phaser.Particles.Arcade.Emitter.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.setColor = function(color) {
  this.color = color;
  this.callAll('setColor', null, this.color);
};

Explosion.prototype.explode = function(explosionSize) {
  explosionSize = explosionSize || this.explosionSize;
  this.start(true, 2000, null, 20);
}

