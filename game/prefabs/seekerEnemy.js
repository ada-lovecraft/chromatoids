'use strict';



var Enemy = require('./enemy');
var GameUtils = require('./gameUtils');

var SeekerEnemy = function(game, x, y, enemyColor, enemySpeed) {

  Enemy.call(this, game, x, y, enemyColor, enemySpeed);
  this.pollingSpeed = 1000;
  this.accellerationSpeed = 300;
  this.maxSpeed = 200;
  this.player = GameUtils.getPlayer();
  this.pollTime = 0;
  this.body.drag = new Phaser.Point(1000, 1000);
  this.body.bounce = new Phaser.Point(0,0);
};

SeekerEnemy.prototype = Object.create(Enemy.prototype);
SeekerEnemy.prototype.constructor = SeekerEnemy;

SeekerEnemy.prototype.onRevived = function() {
  this.alpha = 0.5;
  this.body.velocity.x = 0;
  this.body.velocity.y = 0;
  this.isDangerous = false;
  this.game.add.tween(this).to({alpha: 1}, 250, Phaser.Easing.Linear.NONE, true, null, 6, true).onComplete.add(function() {
    this.isDangerous = true;
  }, this);
};

SeekerEnemy.prototype.update = function() {
  if(this.pollTime < this.game.time.now) {
    this.game.physics.arcade.accelerateToObject(this, this.player, this.accellerationSpeed, this.maxSpeed, this.maxSpeed);
    this.pollTime = this.game.time.now + this.pollingSpeed;
  }
  this.rotation = this.game.physics.arcade.angleBetween(this, this.player);
};

module.exports =  SeekerEnemy;
