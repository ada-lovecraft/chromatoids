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

      this.enemy = new Enemy(game, 10, 10, 1);
      game.add.existing(this.enemy);



    },
    update: function() {
      game.physics.arcade.collide(this.bulletGroup, this.enemy, this.bulletHandler, null, this);
    },
    bulletHandler: function(enemy, bullet) {
      if(bullet.bulletType.color == enemy.enemyType.color) { 
        enemy.kill();
      }
      this.explosion.x = bullet.x;
      this.explosion.y = bullet.y;
      this.explosion.setColor(bullet.bulletType.color);
      this.explosion.explode();
      

      bullet.kill();

    }
  };
  PlayState = Play;
}());