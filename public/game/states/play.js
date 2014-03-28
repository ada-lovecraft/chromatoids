(function() {
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      this.bulletGroup = game.add.group();
      this.enemyGroup = game.add.group();
      this.emitter = game.add.emitter(0,0,100);
      this.emitter.makeParticles('particle');
      this.emitter.gravity = 200;

      this.explosion = new Explosion(game, 100,100, 'white', 4, 10);
      game.add.existing(this.explosion);

      this.player = new Player(game, game.width/2, game.height/2, 500, 100, this.bulletGroup);
      game.add.existing(this.player);

      this.level = 1;


    },
    update: function() {
      if(this.enemyGroup.countLiving() < this.level * 2) {
        var enemy = this.enemyGroup.getFirstExists(false);
        if(!enemy) {
          enemy = new Enemy(game, game.world.randomX, game.world.randomY, game.rnd.integerInRange(0,3));
          this.enemyGroup.add(enemy);
        } else {
          enemy.reset(game.world.randomX, game.world.randomY);
          enemy.setType(game.rnd.integerInRange(0,3));
        }
        enemy.revive();
      }
      game.physics.arcade.collide(this.bulletGroup, this.enemyGroup, this.bulletHandler, null, this);
      game.physics.arcade.collide(this.player, this.enemyGroup, this.deathHandler, null, this);
      //game.physics.arcade.collide(this.explosion, this.enemyGroup, this.bulletHandler, null, this);
    },
    bulletHandler: function(bullet, enemy) {
      if(bullet.bulletType.color == enemy.enemyType.color) { 
        enemy.kill();
      }
      this.explosion.x = bullet.x;
      this.explosion.y = bullet.y;
      this.explosion.setColor(bullet.bulletType.color);
      this.explosion.explode();
      
      bullet.kill();
    },
    deathHandler: function(player, enemy) {
      player.kill();
      enemy.kill();
      this.explosion.x = player.x;
      this.explosion.y = player.y;
      this.explosion.setColor('white');
      this.explosion.explode(100);
    }
  };
  PlayState = Play;
}());