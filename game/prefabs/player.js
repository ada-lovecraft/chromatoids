'use strict';
define(function(require, exports, module) {

  var Colors = require('config/enums').Colors;
  var BulletTypes = require('config/enums').BulletTypes
  
  var Block = require('prefabs/block');
  var Triangle = require('prefabs/triangle');
  var Bullet = require('prefabs/bullet');


  var indicators = {}, 
      indicatorGroup;
  var Player = function(game, x, y, moveSpeed, fireRate, bulletGroup) {
    Block.call(this, game, x, y, 16, 'white');
    this.moveSpeed = moveSpeed || 300;
    this.fireRate = fireRate || 100;
    this.bulletGroup = bulletGroup || this.game.add.group();
    
    
    this.anchor.setTo(0.5, 0.5);

    indicatorGroup = this.game.add.group(this);
    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;

    indicators[Colors.YELLOW] = new Triangle(this.game, 0, -13, 8, Colors.YELLOW);
    indicators[Colors.YELLOW].angle = -45;
    indicatorGroup.add(indicators[Colors.YELLOW]);

    indicators[Colors.GREEN] = new Triangle(this.game, 13, 0, 8, Colors.GREEN);
    indicatorGroup.add(indicators[Colors.GREEN]);
    indicators[Colors.GREEN].angle = 45;

    indicators[Colors.RED] = new Triangle(this.game, 0, 13, 8, Colors.RED);
    indicatorGroup.add(indicators[Colors.RED]);
    indicators[Colors.RED].angle = 135;

    indicators[Colors.BLUE] = new Triangle(this.game, -13, 0, 8, Colors.BLUE);
    indicatorGroup.add(indicators[Colors.BLUE]);
    indicators[Colors.BLUE].angle = -135;

    indicatorGroup.setAll('anchor.x', 0.5);
    indicatorGroup.setAll('anchor.y', 0.5);
    indicatorGroup.setAll('alpha', 0.5);

    
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        
    // add mouse/touch controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.cursors.up.onDown.add(this.fire, this);
    this.cursors.down.onDown.add(this.fire, this);
    this.cursors.left.onDown.add(this.fire, this);
    this.cursors.right.onDown.add(this.fire, this);
    this.fireTimer = this.fireRate;

    this.fireSound = this.game.add.audio('fireSound');
    this.deathSound = this.game.add.audio('playerDeathSound');

    this.events.onKilled.add(this.deathHandler, this);
  };

  Player.prototype = Object.create(Block.prototype);
  Player.prototype.constructor = Player;

  Player.prototype.setMoveSpeed = function(moveSpeed) {
    this.moveSpeed = moveSpeed;
  };

  Player.prototype.setFireRate = function(fireRate) {
    this.fireRate = fireRate || 100;
  };

  Player.prototype.setBulletGroup = function(bulletGroup) {
    this.bulletGroup = bulletGroup;
  }

  Player.prototype.deathHandler = function() {
    this.deathSound.play();
  }


  Player.prototype.fire = function(key) {
    if(this.fireTimer < this.game.time.now) {
      var bulletType = BulletTypes[key.event.keyIdentifier.toUpperCase()];
      var bullet = this.bulletGroup.getFirstExists(false);
      if (!bullet) {
        bullet = new Bullet(this.game, this.x, this.y, bulletType);
        this.bulletGroup.add(bullet);
        
      } else {
        bullet.setBulletType(bulletType);
        bullet.reset(this.x, this.y);
        bullet.revive();
      }
      bullet.fire();
      this.fireTimer = this.game.time.now + this.fireRate;

      indicators[bulletType.color].alpha = 1;
      this.game.add.tween(indicators[bulletType.color]).to({alpha: 0.5}, 100, Phaser.Easing.Linear.NONE, true);
    }
  };

  Player.prototype.update = function() {
    // write your prefab's specific update code here
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    // movement
    if(this.leftKey.justPressed()) {
      this.body.velocity.x = -this.moveSpeed;
    }
    if(this.rightKey.justPressed()) {
      this.body.velocity.x = this.moveSpeed;
    }
    if(this.downKey.justPressed()) {
      this.body.velocity.y = this.moveSpeed;
    }
    if(this.upKey.justPressed()) {
      this.body.velocity.y = -this.moveSpeed;
    }

    
  };

  module.exports = Player;
});
