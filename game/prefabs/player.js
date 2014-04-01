'use strict';

var indicators = {}, 
    indicatorGroup;
var Player = function(game, x, y, moveSpeed, fireRate, bulletGroup) {

  this.moveSpeed = moveSpeed || 300;
  this.fireRate = fireRate || 100;
  this.bulletGroup = bulletGroup || game.add.group();
  
  Block.call(this, game, x, y, 16, 'white');
  this.anchor.setTo(0.5, 0.5);

  indicatorGroup = game.add.group(this);
  game.physics.arcade.enableBody(this);
  this.body.collideWorldBounds = true;

  indicators[Colors.YELLOW] = new Triangle(game, 0, -13, 8, Colors.YELLOW);
  indicators[Colors.YELLOW].angle = -45;
  indicatorGroup.add(indicators[Colors.YELLOW]);

  indicators[Colors.GREEN] = new Triangle(game, 13, 0, 8, Colors.GREEN);
  indicatorGroup.add(indicators[Colors.GREEN]);
  indicators[Colors.GREEN].angle = 45;

  indicators[Colors.RED] = new Triangle(game, 0, 13, 8, Colors.RED);
  indicatorGroup.add(indicators[Colors.RED]);
  indicators[Colors.RED].angle = 135;

  indicators[Colors.BLUE] = new Triangle(game, -13, 0, 8, Colors.BLUE);
  indicatorGroup.add(indicators[Colors.BLUE]);
  indicators[Colors.BLUE].angle = -135;

  indicatorGroup.setAll('anchor.x', 0.5);
  indicatorGroup.setAll('anchor.y', 0.5);
  indicatorGroup.setAll('alpha', 0.5);

  
  this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
  this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
  this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
  this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
      
  // add mouse/touch controls
  this.cursors = game.input.keyboard.createCursorKeys();
  this.cursors.up.onDown.add(this.fire, this);
  this.cursors.down.onDown.add(this.fire, this);
  this.cursors.left.onDown.add(this.fire, this);
  this.cursors.right.onDown.add(this.fire, this);
  this.fireTimer = this.fireRate;

  this.fireSound = game.add.audio('fireSound');
  this.deathSound = game.add.audio('playerDeathSound');

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
  if(this.fireTimer < game.time.now) {
    var bulletType = BulletTypes[key.event.keyIdentifier.toUpperCase()];
    var bullet = this.bulletGroup.getFirstExists(false);
    if (!bullet) {
      bullet = new Bullet(game, this.x, this.y, bulletType);
      this.bulletGroup.add(bullet);
      
    } else {
      bullet.setBulletType(bulletType);
      bullet.reset(this.x, this.y);
      bullet.revive();
    }
    bullet.fire();
    this.fireTimer = game.time.now + this.fireRate;

    indicators[bulletType.color].alpha = 1;
    game.add.tween(indicators[bulletType.color]).to({alpha: 0.5}, 100, Phaser.Easing.Linear.NONE, true);
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
