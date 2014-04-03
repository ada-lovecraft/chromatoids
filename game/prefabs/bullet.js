'use strict';

var Block = require('./block');
var BulletTypes = require('../config/enums').BulletTypes;

var Bullet = function(game, x, y, bulletType, bulletSpeed) {
  this.bulletType = !!bulletType ? bulletType : BulletTypes.DEFAULT;
  this.bulletSpeed = bulletSpeed || 1000;

  Block.call(this, game, x, y, 4, this.bulletType.color);

  this.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enableBody(this);

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;

  this.bulletPower = 200;

  
};

Bullet.prototype = Object.create(Block.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fireAt = function(sprite) {
  
  var angle = this.game.physics.arcade.angleBetween(this, sprite);
  var ray = {
    x: this.x + this.bulletPower * Math.cos(angle),
    y: this.y + this.bulletPower * Math.sin(angle)
  };
  this.game.physics.arcade.moveToXY(this, ray.x, ray.y, null, 300);
};

Bullet.prototype.setBulletType = function(bulletType) {
  this.bulletType = bulletType;
  this.setColor(this.bulletType.color);
};

module.exports = Bullet;


