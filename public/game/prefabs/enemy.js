'use strict';
var EnemyTypes = Object.freeze({
  0: {
    color: 'yellow'
  },
  1: {
    color: 'green'
  },
  2: {
    color: 'red'
  },
  3: {
    color: 'blue'
  },

});

var Enemy = function(game, x, y, enemyType, enemySpeed) {
  this.enemyType = !!enemyType ? EnemyTypes[enemyType] : EnemyTypes[0];
  this.enemySpeed = enemySpeed || 100;
  
  Block.call(this, game, x, y, 32, this.enemyType.color);

  this.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enableBody(this);

  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);
  this.body.immovable = true;
  this.maxSpeed = 500;

  
  this.events.onRevived.add(function() {
    this.body.velocity.x = game.rnd.integerInRange(-this.enemySpeed / 4, this.enemySpeed / 4) * 4;
    this.body.velocity.y = game.rnd.integerInRange(-this.enemySpeed / 4, this.enemySpeed / 4) * 4;
  }, this);
};

Enemy.prototype = Object.create(Block.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.setType = function(enemyType) {
  this.enemyType = EnemyTypes[enemyType];
  this.setColor(this.enemyType.color);
};

Enemy.prototype.update = function() {
  this.body.velocity.x *= 1.002;
  this.body.velocity.y *= 1.002;
  if(this.body.velocity.x > this.maxSpeed) {
    this.body.velocity.x = this.maxSpeed;
  }
  if(this.body.velocity.y > this.maxSpeed) {
    this.body.velocity.y = this.maxSpeed;
  }
}

