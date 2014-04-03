(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
  
  var BasicEnemy = require('../prefabs/basicEnemy');
  var SliderEnemy = require('../prefabs/sliderEnemy');
  var SeekerEnemy = require('../prefabs/seekerEnemy');

exports.Colors = Object.freeze({
  YELLOW: 'yellow',
  GREEN: '#2aff57',
  RED: 'red',
  BLUE: '#2ab1ff',
  GREY: '#cccccc',
  WHITE: 'white'
});

exports.EnemyTypes = Object.freeze({
  
  SEEKER: SeekerEnemy
});

exports.BulletTypes = Object.freeze({
  YELLOW: {
    color: exports.Colors.YELLOW,
    velocity: {
      x: 0,
      y: -1
    }
  },
  GREEN: {
    color: exports.Colors.GREEN,
    velocity: {
      x: 1,
      y: 0
    }
  },
  RED: {
    color: exports.Colors.RED,
    velocity: {
      x: 0,
      y: 1
    }
  },
  BLUE: {
    color: exports.Colors.BLUE,
    velocity: {
      x: -1,
      y: 0
    }
  },
  DEFAULT: {
    color: exports.Colors.GREY,
    velocity: {
      x: 0,
      y: 0
    }
  },
  CHROMATIC: {
    color: exports.Colors.WHITE,
    velocity: {
      x: 0,
      y: 0
    }
  }
});
},{"../prefabs/basicEnemy":4,"../prefabs/seekerEnemy":14,"../prefabs/sliderEnemy":15}],2:[function(require,module,exports){
'use strict';

//global variables


var BootState = require('./states/boot');
var GameoverState = require('./states/gameover');
var MenuState = require('./states/menu');
var PlayState = require('./states/play');
var PreloadState = require('./states/preload');

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'chromatoids');

// Game States
game.state.add('boot', BootState);
game.state.add('gameover', GameoverState);
game.state.add('menu', MenuState);
game.state.add('play', PlayState);
game.state.add('preload', PreloadState);


game.state.start('boot');

  
},{"./states/boot":17,"./states/gameover":18,"./states/menu":19,"./states/play":20,"./states/preload":21}],3:[function(require,module,exports){
'use strict';
  

  var WarpedSound = function(game, key, volume, loop) {
    Phaser.Sound.call(this, game, key, volume, loop);
    game.sound._sounds.push(this);
  };

  WarpedSound.prototype = Object.create(Phaser.Sound.prototype);
  WarpedSound.prototype.constructor = WarpedSound;
  
  module.exports =  WarpedSound;



},{}],4:[function(require,module,exports){
'use strict';


var Enemy = require('./enemy')

var BasicEnemy = function(game, x, y, enemyColor, enemySpeed) {
  Enemy.call(this, game, x, y, enemyColor, enemySpeed);
};

BasicEnemy.prototype = Object.create(Enemy.prototype);
BasicEnemy.prototype.constructor = BasicEnemy;

BasicEnemy.prototype.onRevived = function() {
  this.alpha = 0.5;
  this.body.velocity.x = this.game.rnd.integerInRange(-this.enemySpeed / 4, this.enemySpeed / 4) * 4;
  this.body.velocity.y = this.game.rnd.integerInRange(-this.enemySpeed / 4, this.enemySpeed / 4) * 4;
  this.isDangerous = false;
  this.game.add.tween(this).to({alpha: 1}, 250, Phaser.Easing.Linear.NONE, true, null, 6, true).onComplete.add(function() {
    this.isDangerous = true;
  }, this);
};

BasicEnemy.prototype.update = function() {
  this.body.velocity.x *= 1.002;
  this.body.velocity.y *= 1.002;
  if(this.body.velocity.x > this.maxSpeed) {
    this.body.velocity.x = this.maxSpeed;
  }
  if(this.body.velocity.y > this.maxSpeed) {
    this.body.velocity.y = this.maxSpeed;
  }
}
module.exports = BasicEnemy;




},{"./enemy":9}],5:[function(require,module,exports){
'use strict';

var Primative = require('./primative');
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

module.exports = Block;

},{"./primative":13}],6:[function(require,module,exports){
'use strict';

var Block = require('./block');
var BulletTypes = require('../config/enums').BulletTypes;

var Bullet = function(game, x, y, bulletType, bulletSpeed) {
  this.bulletType = !!bulletType ? bulletType : BulletTypes.DEFAULT;
  this.bulletSpeed = bulletSpeed || 1000;

  Block.call(this, game, x, y, 4, this.bulletType.color);

  this.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enableBody(this);

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;

  this.bulletPower = 200;

  
};

Bullet.prototype = Object.create(Block.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fireAt = function(sprite) {
  
  var angle = this.game.physics.arcade.angleBetween(this, sprite);
  var ray = {
    x: this.x + this.bulletPower * Math.cos(angle),
    y: this.y + this.bulletPower * Math.sin(angle)
  };
  this.game.physics.arcade.moveToXY(this, ray.x, ray.y, null, 300);
};

Bullet.prototype.setBulletType = function(bulletType) {
  this.bulletType = bulletType;
  this.setColor(this.bulletType.color);
};

module.exports = Bullet;



},{"../config/enums":1,"./block":5}],7:[function(require,module,exports){
'use strict';

var Bullet = require('./bullet');
var BulletTypes = require('../config/enums').BulletTypes;

var BulletExplosion = function(game, x, y, explosionSize) {
  this.explosionSize = explosionSize || 10;
  this.explosionTime = 2000;

  Phaser.Particles.Arcade.Emitter.call(this, game, 0, 0);
  this.particleClass = Bullet
  this.gravity = 500;
  this.makeParticles(BulletTypes.DEFAULT);
  this.setRotation(50,100);
};

BulletExplosion.prototype = Object.create(Phaser.Particles.Arcade.Emitter.prototype);
BulletExplosion.prototype.constructor = BulletExplosion;

BulletExplosion.prototype.setParticleType = function(particleType) {
  this.color = particleType.color;
  this.callAll('setBulletType', null, particleType);
};
BulletExplosion.prototype.setExplosionTime = function(explosionTime) {
  this.explosionTime = explosionTime;
};



BulletExplosion.prototype.explode = function(explosionSize) {
  explosionSize = explosionSize || this.explosionSize;
  this.start(true, this.explosionTime, null, explosionSize);
}

module.exports = BulletExplosion;


},{"../config/enums":1,"./bullet":6}],8:[function(require,module,exports){
'use strict';

var Primative = require('./primative');

var CrossHair = function(game, x, y, size, color ) {
  Primative.call(this, game, x, y, size, color);
};

CrossHair.prototype = Object.create(Primative.prototype);
CrossHair.prototype.constructor = CrossHair;

CrossHair.prototype.createTexture = function() {
  this.bmd.clear();
  this.bmd.ctx.beginPath();
  // create circle
  this.bmd.ctx.arc(this.size / 2 , this.size / 2, this.size / 2 - 2, 0, 2 * Math.PI, false);
  this.bmd.ctx.strokeStyle = this.color;
  this.bmd.ctx.lineWidth = 2;
  this.bmd.ctx.moveTo(this.size * 0.5 ,this.size * 0.25);
  this.bmd.ctx.lineTo(this.size * 0.5, this.size * 0.75);
  this.bmd.ctx.moveTo(this.size * 0.25, this.size * 0.5);
  this.bmd.ctx.lineTo(this.size * 0.75, this.size * 0.5);
  this.bmd.ctx.stroke();
  
  this.bmd.render();
  this.bmd.refreshBuffer();
}
module.exports = CrossHair;



},{"./primative":13}],9:[function(require,module,exports){
'use strict';



var Block = require('./block');
var Colors = require('../config/enums').Colors;

var Enemy = function(game, x, y, enemyColor, enemySize, enemySpeed) {
  this.bodyColor = enemyColor || Colors.DEFAULT;
  this.enemySpeed = enemySpeed || 100;
  this.size = enemySize || 24;
  
  Block.call(this, game, x, y, this.size, this.bodyColor);
  this.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enableBody(this);
  
  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);
  this.body.immovable = true;
  this.maxSpeed = 500;

  this.isDangerous = false;
  
  this.events.onRevived.add(this.onRevived, this);
  this.events.onKilled.add(this.deathHandler, this);
  this.deathSound = game.add.audio('enemyDeathSound');
};

Enemy.prototype = Object.create(Block.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.onRevived = function() {
  this.alpha = 0.5;
  this.body.velocity.x = game.rnd.integerInRange(-this.enemySpeed / 4, this.enemySpeed / 4) * 4;
  this.body.velocity.y = game.rnd.integerInRange(-this.enemySpeed / 4, this.enemySpeed / 4) * 4;
  this.isDangerous = false;
  game.add.tween(this).to({alpha: 1}, 250, Phaser.Easing.Linear.NONE, true, null, 6, true).onComplete.add(function() {
    this.isDangerous = true;
  }, this);

};


Enemy.prototype.deathHandler = function() {
  this.deathSound.play();
}

Enemy.prototype.update = function() {
  this.body.velocity.x *= 1.002;
  this.body.velocity.y *= 1.002;
  if(this.body.velocity.x > this.maxSpeed) {
    this.body.velocity.x = this.maxSpeed;
  }
  if(this.body.velocity.y > this.maxSpeed) {
    this.body.velocity.y = this.maxSpeed;
  }
}

module.exports = Enemy;



},{"../config/enums":1,"./block":5}],10:[function(require,module,exports){
'use strict';

var EnemyTypes = require('../config/enums').EnemyTypes;

function EnemyFactory() {}

EnemyFactory.create = function(game, enemyType, x, y, enemyColor, enemySpeed) {
  var enemy;
  if(typeof enemyType === 'string') {
    enemy =  new Enums.EnemyTypes[enemyType](game, x, y, enemyColor, enemySpeed);
  } else {
    enemy =  new enemyType(game, x, y, enemyColor, enemySpeed);
  }

  return enemy;
}

module.exports =  EnemyFactory;

},{"../config/enums":1}],11:[function(require,module,exports){
'use strict';

var Enums = require('../config/enums');


function GameUtils() {
  this.player = null;
}

GameUtils.pickRandomObject = function(obj, rejections) {
  var result;
  var count = 0;
  for (var prop in obj) {
    if (!rejections || rejections.indexOf(prop) === -1) {
      if (Math.random() < 1/++count) {
        result = prop;
      }
    }
  }
  return obj[result];
};

GameUtils.randomEnemyType = function(rejections) {
  return GameUtils.pickRandomObject(Enums.EnemyTypes, rejections);
};

GameUtils.randomColor = function(rejections) {
  var color = GameUtils.pickRandomObject(Enums.Colors, rejections);
  return color;
};

GameUtils.setPlayer = function(player) {
  this.player = player;
};

GameUtils.getPlayer = function() {
  return this.player;
};
module.exports = GameUtils;

},{"../config/enums":1}],12:[function(require,module,exports){
'use strict';


var Colors = require('../config/enums').Colors;
var BulletTypes = require('../config/enums').BulletTypes;

var Block = require('./block');
var Triangle = require('./triangle');
var Bullet = require('./bullet');
var CrossHair = require('./crosshair');

var FireDirections = {
  spreads: [
    { 
      name: 'right',
      min: -0.78, 
      max: 0.78,
      inclusive: true
    },
    { 
      name: 'down',
      min: 0.78,
      max: 2.4,
      inclusive: true
    },
    { 
      name: 'left',
      min: 2.4,
      max: -2.4,
      inclusive: false
    },
    { 
      name: 'up',
      min: -2.4,
      max: -0.78,
      inclusive: true
    },
  ],
  bulletTypes: [
    BulletTypes.GREEN,
    BulletTypes.RED,
    BulletTypes.BLUE,
    BulletTypes.YELLOW
  ]
};


var indicators = {}, 
    indicatorGroup;
var Player = function(game, x, y, moveSpeed, fireRate, bulletGroup) {
  Block.call(this, game, x, y, 16, 'white');
  this.moveSpeed = moveSpeed || 300;
  this.fireRate = fireRate || 100;
  this.bulletGroup = bulletGroup || this.game.add.group();
  
  
  this.anchor.setTo(0.5, 0.5);

  indicatorGroup = this.game.add.group(this);
  this.game.physics.arcade.enableBody(this);
  this.body.collideWorldBounds = true;

  indicators[Colors.YELLOW] = new Triangle(this.game, 0, -13, 8, Colors.YELLOW);
  indicators[Colors.YELLOW].angle = -45;
  indicatorGroup.add(indicators[Colors.YELLOW]);

  indicators[Colors.GREEN] = new Triangle(this.game, 13, 0, 8, Colors.GREEN);
  indicatorGroup.add(indicators[Colors.GREEN]);
  indicators[Colors.GREEN].angle = 45;

  indicators[Colors.RED] = new Triangle(this.game, 0, 13, 8, Colors.RED);
  indicatorGroup.add(indicators[Colors.RED]);
  indicators[Colors.RED].angle = 135;

  indicators[Colors.BLUE] = new Triangle(this.game, -13, 0, 8, Colors.BLUE);
  indicatorGroup.add(indicators[Colors.BLUE]);
  indicators[Colors.BLUE].angle = -135;

  indicatorGroup.setAll('anchor.x', 0.5);
  indicatorGroup.setAll('anchor.y', 0.5);
  indicatorGroup.setAll('alpha', 0.5);

  this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
  this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
  this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
  this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
      
  // add mouse/touch controls
  this.cursors = this.game.input.keyboard.createCursorKeys();
  this.cursors.up.onDown.add(this.fire, this);
  this.cursors.down.onDown.add(this.fire, this);
  this.cursors.left.onDown.add(this.fire, this);
  this.cursors.right.onDown.add(this.fire, this);
  this.fireTimer = this.fireRate;

  this.fireSound = this.game.add.audio('fireSound');
  this.deathSound = this.game.add.audio('playerDeathSound');

  this.events.onKilled.add(this.deathHandler, this);
  this.crossHair = new CrossHair(this.game, this.game.width/2, this.game.height/2, 32, Colors.GREY);
  this.game.add.existing(this.crossHair);
  var mouseSprite = this.game.plugins.add(Phaser.Plugin.MouseSprite);
  
  mouseSprite.setSprite(this.crossHair);
  mouseSprite.setMoveCallback(this.setCrosshairColor, this);


};

Player.prototype = Object.create(Block.prototype);
Player.prototype.constructor = Player;

Player.prototype.setMoveSpeed = function(moveSpeed) {
  this.moveSpeed = moveSpeed;
};

Player.prototype.setFireRate = function(fireRate) {
  this.fireRate = fireRate || 100;
};

Player.prototype.setBulletGroup = function(bulletGroup) {
  this.bulletGroup = bulletGroup;
};

Player.prototype.deathHandler = function() {
  this.deathSound.play();
};


Player.prototype.setCrosshairColor = function() {
  var angle = this.game.physics.arcade.angleToPointer(this);
  /*
  if(angle < 0.78 && angle > -0.78 && this.crossHair.color != Colors.GREEN) {
    this.crossHair.setColor(Colors.GREEN);
  } else if(angle < 2.4 && angle > 0.78 && this.crossHair.color != Colors.RED) {
    this.crossHair.setColor(Colors.RED);
  } else if (angle < -2.4 || angle > 2.4 && this.crossHair.color != Colors.BLUE) {
    this.crossHair.setColor(Colors.BLUE);
  } else if (angle < -0.78 && angle > -2.4 && this.crossHair.color != Colors.YELLOW) {
    this.crossHair.setColor(Colors.YELLOW)
  }*/
  FireDirections.spreads.forEach(function(spread, index){
    if(spread.inclusive) {
      if(angle < spread.max && angle > spread.min && this.crossHair.color !== FireDirections.bulletTypes[index]) {
        this.crossHair.setColor(FireDirections.bulletTypes[index].color);
        this.bulletType = FireDirections.bulletTypes[index];
      }
    } else if(!spread.inclusive) {
      if(angle < spread.max || angle > spread.min && this.crossHair.color !== FireDirections.bulletTypes[index]) {
        this.crossHair.setColor(FireDirections.bulletTypes[index].color);
        this.bulletType = FireDirections.bulletTypes[index];
      }
    }
  }, this);

};

Player.prototype.fire = function() {
  if(this.fireTimer < this.game.time.now) {
    var bullet = this.bulletGroup.getFirstExists(false);
    if (!bullet) {
      bullet = new Bullet(this.game, this.x, this.y, this.bulletType);
      this.bulletGroup.add(bullet);
      
    } else {
      bullet.setBulletType(this.bulletType);
      bullet.reset(this.x, this.y);
      bullet.revive();
    }
    bullet.fireAt(this.crossHair);
    this.fireTimer = this.game.time.now + this.fireRate;

    indicators[this.bulletType.color].alpha = 1;
    this.game.add.tween(indicators[this.bulletType.color]).to({alpha: 0.5}, 100, Phaser.Easing.Linear.NONE, true);
  }
};

Player.prototype.update = function() {
  // write your prefab's specific update code here
  this.body.velocity.x = 0;
  this.body.velocity.y = 0;

  // movement
  if(this.leftKey.justPressed()) {
    this.body.velocity.x = -this.moveSpeed;
  }
  if(this.rightKey.justPressed()) {
    this.body.velocity.x = this.moveSpeed;
  }
  if(this.downKey.justPressed()) {
    this.body.velocity.y = this.moveSpeed;
  }
  if(this.upKey.justPressed()) {
    this.body.velocity.y = -this.moveSpeed;
  }

  if(this.game.input.activePointer.isDown) {
    this.fire();
  }
  
};



module.exports = Player;


},{"../config/enums":1,"./block":5,"./bullet":6,"./crosshair":8,"./triangle":16}],13:[function(require,module,exports){
'use strict';



var Primative = function(game, x, y, size, color ) {
  this.size = size;
  this.color = color;

  this.bmd = game.add.bitmapData(this.size, this.size);
  this.createTexture();
  Phaser.Sprite.call(this, game, x, y, this.bmd);

  // initialize your prefab here
};

Primative.prototype = Object.create(Phaser.Sprite.prototype);
Primative.prototype.constructor = Primative;

Primative.prototype.setColor = function(color) {
  this.color = color;
  this.createTexture();
}

Primative.prototype.createTexture = function() {
  this.bmd.clear();
  this.bmd.ctx.beginPath();
  this.bmd.ctx.rect(0,0,this.size,this.size);
  this.bmd.ctx.fillStyle = this.color;
  this.bmd.ctx.fill();
  this.bmd.ctx.closePath();
  this.bmd.render();
  this.bmd.refreshBuffer();
}

module.exports = Primative;

},{}],14:[function(require,module,exports){
'use strict';



var Enemy = require('./enemy');
var GameUtils = require('./gameUtils');

var SeekerEnemy = function(game, x, y, enemyColor, enemySpeed) {

  Enemy.call(this, game, x, y, enemyColor, enemySpeed);
  this.pollingSpeed = 1000;
  this.accellerationSpeed = 300;
  this.maxSpeed = 200;
  this.player = GameUtils.getPlayer();
  this.pollTime = 0;
  this.body.drag = new Phaser.Point(1000, 1000);
  this.body.bounce = new Phaser.Point(0,0);
};

SeekerEnemy.prototype = Object.create(Enemy.prototype);
SeekerEnemy.prototype.constructor = SeekerEnemy;

SeekerEnemy.prototype.onRevived = function() {
  this.alpha = 0.5;
  this.body.velocity.x = 0;
  this.body.velocity.y = 0;
  this.isDangerous = false;
  this.game.add.tween(this).to({alpha: 1}, 250, Phaser.Easing.Linear.NONE, true, null, 6, true).onComplete.add(function() {
    this.isDangerous = true;
  }, this);
};

SeekerEnemy.prototype.update = function() {
  if(this.pollTime < this.game.time.now) {
    this.game.physics.arcade.accelerateToObject(this, this.player, this.accellerationSpeed, this.maxSpeed, this.maxSpeed);
    this.pollTime = this.game.time.now + this.pollingSpeed;
  }
  this.rotation = this.game.physics.arcade.angleBetween(this, this.player);
};

module.exports =  SeekerEnemy;

},{"./enemy":9,"./gameUtils":11}],15:[function(require,module,exports){
'use strict';





var Enemy = require('./enemy');
var GameUtils = require('./gameUtils');



var SliderEnemy = function(game, x, y, enemyColor, enemySpeed) {

  Enemy.call(this, game, x, y, enemyColor, enemySpeed);
  this.pollingSpeed = 1000;
  this.accellerationSpeed = 300;
  this.maxDistance = 150;
  this.player = GameUtils.getPlayer();
  this.pollTime = 0;
  this.tbmd = this.game.add.bitmapData(this.game.width, this.game.height);
  this.debugTriangle = this.game.add.sprite(0,0, this.tbmd);

};

SliderEnemy.prototype = Object.create(Enemy.prototype);
SliderEnemy.prototype.constructor = SliderEnemy;

SliderEnemy.prototype.onRevived = function() {
  this.alpha = 0.5;
  this.body.velocity.x = 0;
  this.body.velocity.y = 0;
  this.isDangerous = false;
  this.game.add.tween(this).to({alpha: 1}, 250, Phaser.Easing.Linear.NONE, true, null, 6, true).onComplete.add(function() {
    this.isDangerous = true;
  }, this);
};

SliderEnemy.prototype.update = function() {
  if(this.pollTime < this.game.time.now) {
    var angle = this.game.physics.arcade.angleBetween(this, this.player);
    var distance = this.game.physics.arcade.distanceBetween(this, this.player);
    
    var opposite = Math.sin(angle) * distance;
    var adjacent = Math.cos(angle) * distance;
    var travel;

    if(adjacent > this.maxDistance) {
      adjacent = this.maxDistance
    } else if(Math.abs(adjacent) > this.maxDistance) {
      adjacent = -this.maxDistance;
    }
    if(opposite > this.maxDistance) {
      opposite = this.maxDistance;
    } else if(Math.abs(opposite) > this.maxDistance) {
      opposite = -this.maxDistance;
    }

    if(Math.abs(adjacent) > Math.abs(opposite)) {
      travel = { x: this.x + adjacent}
    } else {
      travel = {y: this.y + opposite }
    }

    this.game.add.tween(this).to(travel, this.pollingSpeed / 2, Phaser.Easing.Linear.NONE, true);
    this.pollTime = this.game.time.now + this.pollingSpeed;
  }
  
};

SliderEnemy.prototype.createDebug = function(angle, distance) {
  var opposite = Math.sin(angle) * distance;
  var adjacent = Math.cos(angle) * distance;
  var hx = this.x + distance * Math.cos(angle);
  var hy = this.y + distance * Math.sin(angle);

  this.tbmd.clear();
  this.tbmd.ctx.beginPath();
  this.tbmd.ctx.moveTo(this.x, this.y);
  this.tbmd.ctx.lineTo(hx, hy);
  this.tbmd.ctx.moveTo(this.x, this.y);
  this.tbmd.ctx.lineTo(this.x + adjacent, this.y);
  this.tbmd.ctx.lineTo(hx, hy);
  
  
  this.tbmd.ctx.strokeStyle = '#9cce97';
  this.tbmd.ctx.fillStyle = '#c0fcba';
  this.tbmd.ctx.fill();
  this.tbmd.ctx.stroke();
  this.tbmd.ctx.closePath();
  this.tbmd.render();
  this.tbmd.refreshBuffer();
};

module.exports = SliderEnemy;


},{"./enemy":9,"./gameUtils":11}],16:[function(require,module,exports){
'use strict';



var Primative = require('./primative');

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
};

module.exports =  Triangle;


},{"./primative":13}],17:[function(require,module,exports){
'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    console.log('boot state');
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports =  Boot;
  

},{}],18:[function(require,module,exports){
'use strict';

function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],19:[function(require,module,exports){

'use strict';



function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = Menu;


},{}],20:[function(require,module,exports){
'use strict';



var BulletTypes = require('../config/enums').BulletTypes;
var EnemyTypes = require('../config/enums').EnemyTypes;
var Colors = require('../config/enums').Colors;

var BulletExplosion = require('../prefabs/bulletExplosion');
var Bullet = require('../prefabs/bullet');
var Player = require('../prefabs/player');
var GameUtils = require('../prefabs/gameUtils');
var WarpedSound = require('../prefabs/WarpedSound');
var EnemyFactory = require('../prefabs/enemyFactory');

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

},{"../config/enums":1,"../prefabs/WarpedSound":3,"../prefabs/bullet":6,"../prefabs/bulletExplosion":7,"../prefabs/enemyFactory":10,"../prefabs/gameUtils":11,"../prefabs/player":12}],21:[function(require,module,exports){
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
    this.load.script('MouseSprite', 'js/plugins/MouseSprite.js');


    this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');


  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports =  Preload;

},{}]},{},[2])