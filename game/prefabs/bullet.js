'use strict';
var BulletTypes = Object.freeze({
  0: {
    color: 'yellow',
    velocity: {
      x: 0,
      y: -1
    }
  },
  1: {
    color: 'green',
    velocity: {
      x: 1,
      y: 0
    }
  },
  2: {
    color: 'red',
    velocity: {
      x: 0,
      y: 1
    }
  },
  3: {
    color: 'blue',
    velocity: {
      x: -1,
      y: 0
    }
  },

});

var Bullet = function(game, x, y, bulletType, bulletSpeed) {
  this.bulletType = !!bulletType ? BulletTypes[bulletType] : BulletTypes[0];
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
  this.bulletType = BulletTypes[bulletType];
  this.setColor(this.bulletType.color);
};

