'use strict';


var Player = function(game, x, y, moveSpeed, fireRate, bulletGroup) {

  this.moveSpeed = moveSpeed || 300;
  this.fireRate = fireRate || 100;
  this.bulletGroup = bulletGroup || game.add.group();
  
  Block.call(this, game, x, y, 16, 'white');
  this.anchor.setTo(0.5, 0.5);

  game.physics.arcade.enableBody(this);
  this.body.collideWorldBounds = true;

  
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

Player.prototype.fire = function(key) {
  if(this.fireTimer < game.time.now) {
    var bulletType = BulletTypes[key.event.keyIdentifier.toUpperCase()];
    var bullet = this.bulletGroup.getFirstExists(false);
    if (!bullet) {
      bullet = new Bullet(game, this.x, this.y, bulletType);
      this.bulletGroup.add(bullet);
      bullet.fire()
    } else {
      bullet.setBulletType(bulletType);
      bullet.reset(this.x, this.y);
      bullet.revive();
      bullet.fire();
    }
    this.fireTimer = game.time.now + this.fireRate;
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

  /*
  // firing
  if(this.cursors.up.isDown) {
    this.fire(FireDirection.UP);
  } else if(this.cursors.down.isDown) {
    this.fire(FireDirection.DOWN);
  }
  else if(this.cursors.left.isDown) {
    this.fire(FireDirection.LEFT);
  }
  else if(this.cursors.right.isDown) {
    this.fire(FireDirection.RIGHT);
  }
  */
};
