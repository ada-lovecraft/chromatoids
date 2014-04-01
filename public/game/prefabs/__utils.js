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
  return GameUtils.pickRandomObject(EnemyTypes);
}

GameUtils.randomColor = function(rejections) {
  var color = GameUtils.pickRandomObject(Colors, rejections);
  console.debug(color);
  return color;
}

GameUtils.setPlayer = function(player) {
  this.player = player;
}

GameUtils.getPlayer = function() {
  return this.player;
}