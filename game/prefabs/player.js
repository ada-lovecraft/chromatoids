'use strict';
define(function(require, exports, module) {

  var Colors = require('config/enums').Colors;
  var BulletTypes = require('config/enums').BulletTypes
  
  var Block = require('prefabs/block');
  var Triangle = require('prefabs/triangle');
  var Bullet = require('prefabs/bullet');
  var CrossHair = require('prefabs/crosshair');

  var FireDirections = {
    spreads: [
      { 
        name: 'right',
        min: -0.78, 
        max: 0.78,
        inclusive: true
      },
      { 
        name: 'down',
        min: 0.78,
        max: 2.4,
        inclusive: true
      },
      { 
        name: 'left',
        min: 2.4,
        max: -2.4,
        inclusive: false
      },
      { 
        name: 'up',
        min: -2.4,
        max: -0.78,
        inclusive: true
      },
    ],
    bulletTypes: [
      BulletTypes.GREEN,
      BulletTypes.RED,
      BulletTypes.BLUE,
      BulletTypes.YELLOW
    ]
  }


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
    this.crossHair = new CrossHair(this.game, this.game.width/2, this.game.height/2, 32, Colors.GREY);
    this.game.add.existing(this.crossHair);
    var mouseSprite = this.game.plugins.add(Phaser.Plugin.MouseSprite);
    
    mouseSprite.setSprite(this.crossHair);
    mouseSprite.setMoveCallback(this.setCrosshairColor, this);


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


  Player.prototype.setCrosshairColor = function() {
    var angle = this.game.physics.arcade.angleToPointer(this);
    /*
    if(angle < 0.78 && angle > -0.78 && this.crossHair.color != Colors.GREEN) {
      this.crossHair.setColor(Colors.GREEN);
    } else if(angle < 2.4 && angle > 0.78 && this.crossHair.color != Colors.RED) {
      this.crossHair.setColor(Colors.RED);
    } else if (angle < -2.4 || angle > 2.4 && this.crossHair.color != Colors.BLUE) {
      this.crossHair.setColor(Colors.BLUE);
    } else if (angle < -0.78 && angle > -2.4 && this.crossHair.color != Colors.YELLOW) {
      this.crossHair.setColor(Colors.YELLOW)
    }*/
    FireDirections.spreads.forEach(function(spread, index){
      if(spread.inclusive) {
        if(angle < spread.max && angle > spread.min && this.crossHair.color != FireDirections.bulletTypes[index]) {
          this.crossHair.setColor(FireDirections.bulletTypes[index].color);
          this.bulletType = FireDirections.bulletTypes[index];
        }
      } else if(!spread.inclusive) {
        if(angle < spread.max || angle > spread.min && this.crossHair.color != FireDirections.bulletTypes[index]) {
          this.crossHair.setColor(FireDirections.bulletTypes[index].color);
          this.bulletType = FireDirections.bulletTypes[index];
        }
      }
    }, this);

  }

  Player.prototype.fire = function() {
    if(this.fireTimer < this.game.time.now) {
      var bullet = this.bulletGroup.getFirstExists(false);
      if (!bullet) {
        bullet = new Bullet(this.game, this.x, this.y, this.bulletType);
        this.bulletGroup.add(bullet);
        
      } else {
        bullet.setBulletType(this.bulletType);
        bullet.reset(this.x, this.y);
        bullet.revive();
      }
      bullet.fireAt(this.crossHair);
      this.fireTimer = this.game.time.now + this.fireRate;

      indicators[this.bulletType.color].alpha = 1;
      this.game.add.tween(indicators[this.bulletType.color]).to({alpha: 0.5}, 100, Phaser.Easing.Linear.NONE, true);
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

    if(this.game.input.activePointer.isDown) {
      this.fire();
    }
    
  };



  module.exports = Player;
});
