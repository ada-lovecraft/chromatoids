'use strict';
define(function(require, exports, module) {

  var Bullet = require('../prefabs/bullet');
  var BulletTypes = require('config/enums').BulletTypes;

  var BulletExplosion = function(game, x, y, explosionSize) {
    this.explosionSize = explosionSize || 10;
    this.explosionTime = 2000;

    Phaser.Particles.Arcade.Emitter.call(this, game, 0, 0);
    this.particleClass = Bullet
    this.gravity = 500;
    this.makeParticles(BulletTypes.DEFAULT);
    this.setRotation(50,100);
  };

  BulletExplosion.prototype = Object.create(Phaser.Particles.Arcade.Emitter.prototype);
  BulletExplosion.prototype.constructor = BulletExplosion;

  BulletExplosion.prototype.setParticleType = function(particleType) {
    this.color = particleType.color;
    this.callAll('setBulletType', null, particleType);
  };
  BulletExplosion.prototype.setExplosionTime = function(explosionTime) {
    this.explosionTime = explosionTime;
  };



  BulletExplosion.prototype.explode = function(explosionSize) {
    explosionSize = explosionSize || this.explosionSize;
    this.start(true, this.explosionTime, null, explosionSize);
  }

  module.exports = BulletExplosion;
});
