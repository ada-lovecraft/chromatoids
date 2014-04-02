'use strict';

define(function(require, exports, module) {

  var Primative = require('../prefabs/primative');
  
  var Triangle = function(game, x, y, size, color, stroke ) {
    this.stroke = stroke;
    Primative.call(this, game, x, y, size, color);
  };

  Triangle.prototype = Object.create(Primative.prototype);
  Triangle.prototype.constructor = Triangle;

  Triangle.prototype.createTexture = function() {
    this.bmd.clear();
    this.bmd.ctx.beginPath();
    this.bmd.ctx.lineTo(this.size,0);
    this.bmd.ctx.lineTo(this.size,this.size);
    this.bmd.ctx.lineTo(0,0);
    this.bmd.ctx.fillStyle = this.color;
    this.bmd.ctx.fill();
    this.bmd.ctx.closePath();
    this.bmd.render();
    this.bmd.refreshBuffer();
  }

  module.exports =  Triangle;
});
