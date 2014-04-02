define(function(require, exports, module) {

  var Enums = require('config/enums');
  
  
  function GameUtils() {
    this.player = null
  }

  GameUtils.pickRandomObject = function(obj, rejections) {
    var result;
    var count = 0;
    for (var prop in obj)
        if(!rejections || rejections.indexOf(prop) == -1) {
          if (Math.random() < 1/++count)
             result = prop;
        }
    return obj[result];
  }

  GameUtils.randomEnemyType = function(rejections) {
    return GameUtils.pickRandomObject(Enums.EnemyTypes);
  }

  GameUtils.randomColor = function(rejections) {
    var color = GameUtils.pickRandomObject(Enums.Colors, rejections);
    return color;
  }

  GameUtils.setPlayer = function(player) {
    this.player = player;
  }

  GameUtils.getPlayer = function() {
    return this.player;
  }
  module.exports = GameUtils;
});