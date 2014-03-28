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