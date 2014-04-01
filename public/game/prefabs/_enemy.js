'use strict';


var Enemy = function(game, x, y, enemyColor, enemySize, enemySpeed) {
  this.bodyColor = enemyColor || Colors.DEFAULT;
  this.enemySpeed = enemySpeed || 100;
  this.size = enemySize || 24;
  
  Block.call(this, game, x, y, this.size, this.bodyColor);
  this.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enableBody(this);
  
  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);
  this.body.immovable = true;
  this.maxSpeed = 500;

  this.isDangerous = false;
  
  this.events.onRevived.add(this.onRevived, this);
  this.events.onKilled.add(this.deathHandler, this);
  this.deathSound = game.add.audio('enemyDeathSound');
};

Enemy.prototype = Object.create(Block.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.onRevived = function() {
  this.alpha = 0.5;
  this.body.velocity.x = game.rnd.integerInRange(-this.enemySpeed / 4, this.enemySpeed / 4) * 4;
  this.body.velocity.y = game.rnd.integerInRange(-this.enemySpeed / 4, this.enemySpeed / 4) * 4;
  this.isDangerous = false;
  game.add.tween(this).to({alpha: 1}, 250, Phaser.Easing.Linear.NONE, true, null, 6, true).onComplete.add(function() {
    this.isDangerous = true;
  }, this);

};


Enemy.prototype.deathHandler = function() {
  this.deathSound.play();
}

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

