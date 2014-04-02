'use strict';

define(function(require, exports, module) {

  var Enemy = require('prefabs/enemy');
  var GameUtils = require('prefabs/gameUtils');

  var SliderEnemy = function(game, x, y, enemyColor, enemySpeed) {

    Enemy.call(this, game, x, y, enemyColor, enemySpeed);
    this.pollingSpeed = 1000;
    this.accellerationSpeed = 300;
    this.maxDistance = 150;
    this.player = GameUtils.getPlayer();
    this.pollTime = 0;
    this.tbmd = this.game.add.bitmapData(this.game.width, this.game.height);
    this.debugTriangle = this.game.add.sprite(0,0, this.tbmd);

  };

  SliderEnemy.prototype = Object.create(Enemy.prototype);
  SliderEnemy.prototype.constructor = SliderEnemy;

  SliderEnemy.prototype.onRevived = function() {
    this.alpha = 0.5;
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.isDangerous = false;
    this.game.add.tween(this).to({alpha: 1}, 250, Phaser.Easing.Linear.NONE, true, null, 6, true).onComplete.add(function() {
      this.isDangerous = true;
    }, this);
  };

  SliderEnemy.prototype.update = function() {
    if(this.pollTime < this.game.time.now) {
      var angle = this.game.physics.arcade.angleBetween(this, this.player);
      var distance = this.game.physics.arcade.distanceBetween(this, this.player);
      
      var opposite = Math.sin(angle) * distance;
      var adjacent = Math.cos(angle) * distance;
      var travel;

      if(adjacent > this.maxDistance) {
        adjacent = this.maxDistance
      } else if(Math.abs(adjacent) > this.maxDistance) {
        adjacent = -this.maxDistance;
      }
      if(opposite > this.maxDistance) {
        opposite = this.maxDistance;
      } else if(Math.abs(opposite) > this.maxDistance) {
        opposite = -this.maxDistance;
      }

      if(Math.abs(adjacent) > Math.abs(opposite)) {
        travel = { x: this.x + adjacent}
      } else {
        travel = {y: this.y + opposite }
      }

      console.log(travel, adjacent, opposite);

      this.game.add.tween(this).to(travel, this.pollingSpeed / 2, Phaser.Easing.Linear.NONE, true);
      this.pollTime = this.game.time.now + this.pollingSpeed;
      //this.pollTime = 0;
    }
    
  };

  SliderEnemy.prototype.createDebug = function(angle, distance) {
    var opposite = Math.sin(angle) * distance;
    var adjacent = Math.cos(angle) * distance;
    var hx = this.x + distance * Math.cos(angle);
    var hy = this.y + distance * Math.sin(angle);

    this.tbmd.clear();
    this.tbmd.ctx.beginPath();
    this.tbmd.ctx.moveTo(this.x, this.y);
    this.tbmd.ctx.lineTo(hx, hy);
    this.tbmd.ctx.moveTo(this.x, this.y);
    this.tbmd.ctx.lineTo(this.x + adjacent, this.y);
    this.tbmd.ctx.lineTo(hx, hy);
    
    
    this.tbmd.ctx.strokeStyle = '#9cce97';
    this.tbmd.ctx.fillStyle = '#c0fcba';
    this.tbmd.ctx.fill();
    this.tbmd.ctx.stroke();
    this.tbmd.ctx.closePath();
    this.tbmd.render();
    this.tbmd.refreshBuffer();
  }

  module.exports = SliderEnemy;

});
