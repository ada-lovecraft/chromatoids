'use strict';

var Block = function(game, x, y, size, color ) {
  Primative.call(this, game, x, y, size, color);
};

Block.prototype = Object.create(Primative.prototype);
Block.prototype.constructor = Block;

Block.prototype.createTexture = function() {
  this.bmd.clear();
  this.bmd.ctx.beginPath();
  this.bmd.ctx.rect(0,0,this.size,this.size);
  this.bmd.ctx.fillStyle = this.color;
  this.bmd.ctx.fill();
  this.bmd.ctx.closePath();
  this.bmd.render();
  this.bmd.refreshBuffer();
}
