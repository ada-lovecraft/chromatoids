'use strict';
define(function(require, exports, module) {
  var Block = require('../prefabs/block');
  var BulletTypes = require('config/enums').BulletTypes;

  var Bullet = function(game, x, y, bulletType, bulletSpeed) {
    this.bulletType = !!bulletType ? bulletType : BulletTypes.DEFAULT;
    this.bulletSpeed = bulletSpeed || 1000;

    Block.call(this, game, x, y, 4, this.bulletType.color);

    this.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enableBody(this);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;

    
  };

  Bullet.prototype = Object.create(Block.prototype);
  Bullet.prototype.constructor = Bullet;

  Bullet.prototype.fire = function() {
    this.body.velocity.x = this.bulletType.velocity.x * this.bulletSpeed;
    this.body.velocity.y = this.bulletType.velocity.y * this.bulletSpeed;

  };

  Bullet.prototype.setBulletType = function(bulletType) {
    this.bulletType = bulletType;
    this.setColor(this.bulletType.color);
  };

  module.exports = Bullet;
});

