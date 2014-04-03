'use strict';


var Enemy = require('./enemy')

var BasicEnemy = function(game, x, y, enemyColor, enemySpeed) {
  Enemy.call(this, game, x, y, enemyColor, enemySpeed);
};

BasicEnemy.prototype = Object.create(Enemy.prototype);
BasicEnemy.prototype.constructor = BasicEnemy;

BasicEnemy.prototype.onRevived = function() {
  this.alpha = 0.5;
  this.body.velocity.x = this.game.rnd.integerInRange(-this.enemySpeed / 4, this.enemySpeed / 4) * 4;
  this.body.velocity.y = this.game.rnd.integerInRange(-this.enemySpeed / 4, this.enemySpeed / 4) * 4;
  this.isDangerous = false;
  this.game.add.tween(this).to({alpha: 1}, 250, Phaser.Easing.Linear.NONE, true, null, 6, true).onComplete.add(function() {
    this.isDangerous = true;
  }, this);
};

BasicEnemy.prototype.update = function() {
  this.body.velocity.x *= 1.002;
  this.body.velocity.y *= 1.002;
  if(this.body.velocity.x > this.maxSpeed) {
    this.body.velocity.x = this.maxSpeed;
  }
  if(this.body.velocity.y > this.maxSpeed) {
    this.body.velocity.y = this.maxSpeed;
  }
}
module.exports = BasicEnemy;



