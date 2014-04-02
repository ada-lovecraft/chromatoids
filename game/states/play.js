'use strict';
define(function(require, exports, module) {
  var Phaser = require('phaser');
  
  var BulletTypes = require('config/enums').BulletTypes;
  var EnemyTypes = require('config/enums').EnemyTypes;
  var Colors = require('config/enums').Colors;

  var BulletExplosion = require('prefabs/bulletExplosion');
  var Bullet = require('prefabs/bullet');
  var Player = require('prefabs/player');
  var GameUtils = require('prefabs/gameUtils');
  var WarpedSound = require('prefabs/WarpedSound');
  var EnemyFactory = require('prefabs/enemyFactory');

  function Play() {}
  Play.prototype = {
    create: function() {
      this.level = 1;
      this.gameOver = false;
      this.score = 0;

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.bulletGroup = this.game.add.group();
      this.enemyGroup = this.game.add.group();
      this.pointGroup = this.game.add.group();

      this.bulletExplosion = new BulletExplosion(this.game, 100,100,  10);

      this.enemyDeathExplosion = new BulletExplosion(this.game, 100, 100, 20);
      this.enemyDeathExplosion.setXSpeed(-500,500);
      this.enemyDeathExplosion.setYSpeed(-500,500);

      this.playerDeathExplosion = new BulletExplosion(this.game, 100, 100, 100);
      this.playerDeathExplosion.setXSpeed(-1000,1000);
      this.playerDeathExplosion.setYSpeed(-1000,1000);

      this.game.add.existing(this.bulletExplosion);

      this.player = new Player(this.game, this.game.width/2, this.game.height/2, 500, 100, this.bulletGroup);
      this.game.add.existing(this.player);
      GameUtils.setPlayer(this.player);

      this.scoreText = this.game.add.bitmapText(10, 10, 'minecraftia','SCORE: 0', 16);

      this.music = new WarpedSound(this.game, 'gameMusic');
      //this.music.play();

      this.wrongSound = this.game.add.audio('wrongSound', 0.2);

      

      //var clock = game.add.sprite(100, 100, 'clock');
      //var bomb = game.add.sprite(200, 100, 'bomb');
    },
    update: function() {
      this.generateEnemy();
      this.checkCollisions();

      if(this.gameOver) {
        if(!!!this.playerDeathExplosion.countLiving() && !this.playerDeathExplosion.on && !!!this.enemyDeathExplosion.countLiving()) {
          this.music.stop();
          this.game.state.start('gameover');
        }
      }
    },
    checkCollisions: function() {
      this.game.physics.arcade.collide(this.bulletGroup, this.enemyGroup, this.bulletHandler, null, this);
      this.game.physics.arcade.overlap(this.player, this.enemyGroup, this.deathHandler, this.checkIsDangerous, this);
      this.game.physics.arcade.collide(this.enemyDeathExplosion, this.enemyGroup, this.bulletHandler, null, this);
      if(this.gameOver) {
        this.game.physics.arcade.collide(this.playerDeathExplosion, this.enemyGroup, this.bulletHandler, null, this);
      }
    },
    checkIsDangerous: function(player, enemy) {
      return enemy.isDangerous;
    },
    generateEnemy: function() {
      if(this.enemyGroup.countLiving() < this.level * 2 && !this.gameOver) {
        /*
        var enemy = this.enemyGroup.getFirstExists(false);
        if(!enemy) {
          enemy = EnemyFactory.create(EnemyTypes.BASIC, game, game.world.randomX, game.world.randomY, Colors.YELLOW);
          this.enemyGroup.add(enemy);
        } else {
          enemy.reset(game.world.randomX, game.world.randomY);
          enemy.setType(game.rnd.integerInRange(0,3));
        }
        */
        var enemy = EnemyFactory.create(this.game, GameUtils.randomEnemyType(), this.game.world.randomX, this.game.world.randomY, GameUtils.randomColor(['GREY', 'WHITE']));
        enemy.revive();
        this.enemyGroup.add(enemy);
        
      }
    },
    bulletHandler: function(bullet, enemy) {
      if(bullet.bulletType == BulletTypes.CHROMATIC || bullet.bulletType.color == enemy.bodyColor) { 
        enemy.kill();
        this.enemyDeathExplosion.x = enemy.x;
        this.enemyDeathExplosion.y = enemy.y;
        this.enemyDeathExplosion.setParticleType(bullet.bulletType)
        this.enemyDeathExplosion.explode();
        this.score += 100;
          
        var pointFader = this.pointGroup.getFirstExists(false);
        if (!pointFader) {
          pointFader = this.game.add.bitmapText(enemy.x - enemy.width / 2, enemy.y - enemy.height / 2, 'minecraftia', '+100', 16);
          //pointFader.anchor.setTo(0.5, 0.5);
          this.pointGroup.add(pointFader);
        }

        var tween = this.game.add.tween(pointFader).to({y: pointFader.y - 30, alpha: 0}, 300, Phaser.Easing.Linear.NONE, true);
        this.scoreText.setText('SCORE: ' + this.score);
        this.level = Math.ceil(this.score / 1000);
        
      } else {
        this.wrongSound.play();
        this.bulletExplosion.x = bullet.x;
        this.bulletExplosion.y = bullet.y;
        this.bulletExplosion.explode();
      }

      bullet.kill();
    },
    deathHandler: function(player, enemy) {
      player.kill();
      enemy.kill();
      this.score += 100;
      this.scoreText.setText('SCORE: ' + this.score);
      this.playerDeathExplosion.x = player.x;
      this.playerDeathExplosion.y = player.y;
      this.playerDeathExplosion.setParticleType(BulletTypes.CHROMATIC);
      this.playerDeathExplosion.explode();
      this.gameOver = true;
      this.game.add.tween(this.music).to({volume: 0}, 1500, Phaser.Easing.Linear.None, true);
    }
  };
  module.exports = Play;
});