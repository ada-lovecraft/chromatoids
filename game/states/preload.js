(function () {
  'use strict';
  function Preload() {
    this.asset = null;
    this.ready = false;
  }

  Preload.prototype = {
    preload: function() {
      this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      this.load.image('yeoman', 'assets/yeoman-logo.png');
      this.load.image('particle', 'assets/particle.png');
      this.load.image('clock', 'assets/clock.png');
      this.load.image('bomb', 'assets/bomb.png');
      this.load.audio('gameMusic', ['assets/stage-one.mp3', 'assets/stage-one.ogg']);
      this.load.audio('enemyDeathSound', 'assets/enemy-death.wav');
      this.load.audio('playerDeathSound', 'assets/player-death.wav');
      this.load.audio('fireSound', 'assets/fire.wav');
      this.load.audio('wrongSound', 'assets/wrong-color.wav');


      game.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');


    },
    create: function() {
      this.asset.cropEnabled = false;
    },
    update: function() {
      if(!!this.ready) {
        game.state.start('menu');
      }
    },
    onLoadComplete: function() {
      this.ready = true;
    }
  };

  PreloadState = Preload;
}());