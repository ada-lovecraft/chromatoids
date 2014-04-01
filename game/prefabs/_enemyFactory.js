

function EnemyFactory() {}

EnemyFactory.create = function(game, enemyType, x, y, enemyColor, enemySpeed) {
  var enemy;
  if(typeof enemyType === 'string') {
    enemy =  new EnemyTypes[enemyType](game, x, y, enemyColor, enemySpeed);
  } else {
    enemy =  new enemyType(game, x, y, enemyColor, enemySpeed);
  }

  return enemy;
}