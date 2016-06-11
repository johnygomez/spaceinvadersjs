(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Star = require('./Star');

var _Star2 = _interopRequireDefault(_Star);

var _Renderer = require('./Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Background = function () {
  function Background(container) {
    var width = arguments.length <= 1 || arguments[1] === undefined ? 300 : arguments[1];
    var height = arguments.length <= 2 || arguments[2] === undefined ? 400 : arguments[2];
    var numOfStars = arguments.length <= 3 || arguments[3] === undefined ? 50 : arguments[3];

    _classCallCheck(this, Background);

    var el = document.getElementById(container);
    this.canvas = document.createElement('canvas');
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.id = 'bg-canvas';
    this.minVelocity = 0.1;
    this.maxVelocity = 0.5;
    this.stars = [];
    this.numStars = numOfStars;
    el.insertBefore(this.canvas, el.firstChild);

    this.initStars();
    this.renderer = new _Renderer2.default(this.update.bind(this));
  }

  _createClass(Background, [{
    key: 'initStars',
    value: function initStars() {
      for (var i = 0; i < this.numStars; i++) {
        this.stars[i] = new _Star2.default(Math.random() * this.width, Math.random() * this.height, Math.random() * 3 + 1, Math.random() * (this.maxVelocity - this.minVelocity) + this.minVelocity);
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var ctx = this.canvas.getContext('2d');
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, this.width, this.height);

      ctx.fillStyle = '#ffffff';
      for (var i = 0; i < this.stars.length; i++) {
        var star = this.stars[i];
        star.x += star.velocity;
        //  If the star has moved from the bottom of the screen, spawn it at the top.
        if (star.x > this.width) {
          this.stars[i] = new _Star2.default(0, Math.random() * this.height, Math.random() * 3 + 1, Math.random() * (this.maxVelocity - this.minVelocity) + this.minVelocity);
        }

        ctx.fillRect(star.x, star.y, star.size, star.size);
      }
    }
  }, {
    key: 'start',
    value: function start() {
      this.renderer.redraw();
    }
  }]);

  return Background;
}();

exports.default = Background;

},{"./Renderer":11,"./Star":14}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Obj2 = require('./Obj');

var _Obj3 = _interopRequireDefault(_Obj2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bomb = function (_Obj) {
  _inherits(Bomb, _Obj);

  function Bomb(x, y, velocity) {
    _classCallCheck(this, Bomb);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Bomb).call(this, x, y));

    _this.velocity = velocity;
    return _this;
  }

  return Bomb;
}(_Obj3.default);

exports.default = Bomb;

},{"./Obj":8}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _IntroState = require('./IntroState');

var _IntroState2 = _interopRequireDefault(_IntroState);

var _Highscore = require('./Highscore');

var _Highscore2 = _interopRequireDefault(_Highscore);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(gameboardID) {
    _classCallCheck(this, Game);

    this.gameboard = document.getElementById(gameboardID);
    this.highscore = new _Highscore2.default();

    // Set the initial config.
    this.config = _config2.default;
    this.width = this.config.gameWidth;
    this.height = this.config.gameHeight;

    this.mainCanvas = document.createElement('canvas');
    this.mainCanvas.width = this.width;
    this.mainCanvas.height = this.height;
    this.mainCanvas.id = 'main-canvas';
    this.gameboard.appendChild(this.mainCanvas);

    // All state is in the variables below.
    this.lives = 3;
    this.score = 0;
    this.boundaries = {
      left: 20,
      right: this.width - 20,
      top: 20,
      bottom: this.height - 20
    };

    //  The state stack.
    this.stateStack = [];

    //  Input/output
    this.pressedKeys = {};
  }

  _createClass(Game, [{
    key: 'play',
    value: function play() {
      var _this = this;

      window.addEventListener('keydown', function (e) {
        var keycode = e.which || window.event.keycode;
        //  Supress further processing of left/right/space (37/29/32)
        if (keycode === 37 || keycode === 39 || keycode === 32) {
          e.preventDefault();
        }

        _this.keyDown(keycode);
      });

      window.addEventListener('keyup', function (e) {
        var keycode = e.which || window.event.keycode;
        _this.keyUp(keycode);
      });

      this.lives = 3;
      this.state = new _IntroState2.default(this, this.mainCanvas.getContext('2d'));
    }
  }, {
    key: 'keyDown',
    value: function keyDown(keyCode) {
      this.pressedKeys[keyCode] = true;
      if (this.state && this.state.keyDown) {
        this.state.keyDown(keyCode);
      }
    }
  }, {
    key: 'keyUp',
    value: function keyUp(keyCode) {
      Reflect.deleteProperty(this.pressedKeys, keyCode);

      if (this.state && this.state.keyUp) {
        this.state.keyUp(keyCode);
      }
    }
  }, {
    key: 'state',
    get: function get() {
      return this.stateStack.length > 0 ? this.stateStack[this.stateStack.length - 1] : null;
    },
    set: function set(newState) {
      if (this.state) {

        if (this.state.leave) {
          this.state.leave();
        }

        this.stateStack.pop();
      }

      if (newState.enter) {
        newState.enter();
      }
      this.stateStack.push(newState);
    }
  }]);

  return Game;
}();

exports.default = Game;

},{"./Highscore":5,"./IntroState":6,"./config":17}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _State2 = require('./State');

var _State3 = _interopRequireDefault(_State2);

var _PreloadState = require('./PreloadState');

var _PreloadState2 = _interopRequireDefault(_PreloadState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameOverState = function (_State) {
  _inherits(GameOverState, _State);

  function GameOverState() {
    _classCallCheck(this, GameOverState);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GameOverState).apply(this, arguments));
  }

  _createClass(GameOverState, [{
    key: 'draw',
    value: function draw() {
      this.ctx.clearRect(0, 0, this.game.width, this.game.height);
      this.ctx.font = '30px Arial';
      this.ctx.fillStyle = '#ffffff';
      this.ctx.textBaseline = 'center';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Game Over!', this.game.width / 2, this.game.height / 2 - 40);
      this.ctx.font = '16px Arial';
      this.ctx.fillText('Press \'Enter\' to restart the game', this.game.width / 2, this.game.height / 2);
    }
  }, {
    key: 'enter',
    value: function enter() {
      var _this2 = this;

      this.draw();
      $('#score-form').openModal();
      $('#name').focus();
      $('#save-score').click(function (e) {
        var email = $('#email');
        var name = $('#name');
        validate_field(email);

        // basic validation
        if (email.hasClass('invalid') || email.val().length === 0 || name.val().length === 0) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        // save game and close modal
        _this2.game.highscore.save(name.val(), email.val(), _this2.game.score);
        $('#score-form').closeModal();
      });
    }
  }, {
    key: 'keyDown',
    value: function keyDown(keyCode) {
      if (keyCode === 13) {
        this.game.lives = 3;
        this.game.state = new _PreloadState2.default(this.game, this.ctx);
      }
    }
  }]);

  return GameOverState;
}(_State3.default);

exports.default = GameOverState;

},{"./PreloadState":10,"./State":15}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Highscore = function () {
  function Highscore() {
    _classCallCheck(this, Highscore);

    this.ranking = JSON.parse(localStorage.getItem('highscores')) || [];
  }

  _createClass(Highscore, [{
    key: 'save',
    value: function save(name, address, score) {
      var added = false;
      for (var i = 0; i < this.ranking.length; i++) {
        if (score > this.ranking[i].score) {
          this.ranking.splice(i, 0, { name: name, address: address, score: score });
          added = true;
          break;
        }
      }

      if (added === false) this.ranking.push({ name: name, address: address, score: score });
      localStorage.setItem('highscores', JSON.stringify(this.ranking));
    }
  }, {
    key: 'reset',
    value: function reset() {
      localStorage.setItem('highscores', JSON.stringify([]));
    }
  }]);

  return Highscore;
}();

exports.default = Highscore;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _State2 = require('./State');

var _State3 = _interopRequireDefault(_State2);

var _PreloadState = require('./PreloadState');

var _PreloadState2 = _interopRequireDefault(_PreloadState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IntroState = function (_State) {
  _inherits(IntroState, _State);

  function IntroState() {
    _classCallCheck(this, IntroState);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(IntroState).apply(this, arguments));
  }

  _createClass(IntroState, [{
    key: 'draw',
    value: function draw() {
      this.ctx.clearRect(0, 0, this.game.width, this.game.height);
      this.ctx.font = '30px Arial';
      this.ctx.fillStyle = '#ffffff';
      this.ctx.textBaseline = 'center';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Space Invaders', this.game.width / 2, this.game.height / 2 - 40);
      this.ctx.font = '16px Arial';
      this.ctx.fillText('Press \'Enter\' to start.', this.game.width / 2, this.game.height / 2);
    }
  }, {
    key: 'enter',
    value: function enter() {
      this.draw();
    }
  }, {
    key: 'keyDown',
    value: function keyDown(keyCode) {
      if (keyCode === 13) {
        //  Enter starts the game.
        this.game.state = new _PreloadState2.default(this.game, this.ctx);
      }
    }
  }]);

  return IntroState;
}(_State3.default);

exports.default = IntroState;

},{"./PreloadState":10,"./State":15}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Obj2 = require('./Obj');

var _Obj3 = _interopRequireDefault(_Obj2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Invader = function (_Obj) {
  _inherits(Invader, _Obj);

  function Invader(x, y, rank, file, type) {
    _classCallCheck(this, Invader);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Invader).call(this, x, y));

    _this.rank = rank;
    _this.file = file;
    _this.type = type;
    _this.width = 18;
    _this.height = 14;
    return _this;
  }

  return Invader;
}(_Obj3.default);

exports.default = Invader;

},{"./Obj":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Obj = function Obj(x, y) {
  _classCallCheck(this, Obj);

  this.x = x;
  this.y = y;
};

exports.default = Obj;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Bomb = require('./Bomb');

var _Bomb2 = _interopRequireDefault(_Bomb);

var _Invader = require('./Invader');

var _Invader2 = _interopRequireDefault(_Invader);

var _Renderer = require('./Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

var _Rocket = require('./Rocket');

var _Rocket2 = _interopRequireDefault(_Rocket);

var _State2 = require('./State');

var _State3 = _interopRequireDefault(_State2);

var _Ship = require('./Ship');

var _Ship2 = _interopRequireDefault(_Ship);

var _GameOverState = require('./GameOverState');

var _GameOverState2 = _interopRequireDefault(_GameOverState);

var _PreloadState = require('./PreloadState');

var _PreloadState2 = _interopRequireDefault(_PreloadState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayState = function (_State) {
  _inherits(PlayState, _State);

  function PlayState(game, ctx, level) {
    _classCallCheck(this, PlayState);

    //  Game state.

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PlayState).call(this, game, ctx));

    _this.invaderCurrentVelocity = 10;
    _this.invaderCurrentDropDistance = 0;
    _this.invadersAreDropping = false;
    _this.lastRocketTime = null;

    //  Game entities.
    _this.ship = null;
    _this.invaders = [];
    _this.rockets = [];
    _this.bombs = [];
    _this.dt = 1 / _this.game.config.fps;
    _this.level = level;

    _this.popSound = new Audio('/audio/pop.mp3');
    _this.explodeSound = new Audio('/audio/explode1.mp3');
    _this.renderer = new _Renderer2.default(_this.update.bind(_this));
    return _this;
  }

  _createClass(PlayState, [{
    key: 'draw',
    value: function draw() {
      this.ctx.clearRect(0, 0, this.game.width, this.game.height);

      //  Draw ship.
      this.ctx.fillStyle = '#999999';
      this.ctx.fillRect(this.ship.x - this.ship.width / 2, this.ship.y - this.ship.height / 2, this.ship.width, this.ship.height);

      //  Draw invaders.
      this.ctx.fillStyle = '#006600';
      for (var i = 0; i < this.invaders.length; i++) {
        var invader = this.invaders[i];
        this.ctx.fillRect(invader.x - invader.width / 2, invader.y - invader.height / 2, invader.width, invader.height);
      }

      //  Draw bombs.
      this.ctx.fillStyle = '#ff5555';
      for (var _i = 0; _i < this.bombs.length; _i++) {
        var bomb = this.bombs[_i];
        this.ctx.fillRect(bomb.x - 2, bomb.y - 2, 4, 4);
      }

      //  Draw rockets.
      this.ctx.fillStyle = '#ff0000';
      for (var _i2 = 0; _i2 < this.rockets.length; _i2++) {
        var rocket = this.rockets[_i2];
        this.ctx.fillRect(rocket.x, rocket.y - 2, 1, 4);
      }
    }
  }, {
    key: 'enter',
    value: function enter() {
      this.ship = new _Ship2.default(this.game.width / 2, this.game.boundaries.bottom);
      this.initLevel();
      this.createInvaders();
      this.renderer.redraw();
    }
  }, {
    key: 'leave',
    value: function leave() {
      this.renderer.stop();
      this.renderer = null;
    }
  }, {
    key: 'initLevel',
    value: function initLevel() {
      var levelMultiplier = this.level * this.game.config.levelDifficultyMultiplier;
      this.shipSpeed = this.game.config.shipSpeed;
      this.invaderInitialVelocity = this.game.config.invaderInitialVelocity + levelMultiplier * this.game.config.invaderInitialVelocity;
      this.bombRate = this.game.config.bombRate + levelMultiplier * this.game.config.bombRate;
      this.bombMinVelocity = this.game.config.bombMinVelocity + levelMultiplier * this.game.config.bombMinVelocity;
      this.bombMaxVelocity = this.game.config.bombMaxVelocity + levelMultiplier * this.game.config.bombMaxVelocity;
    }
  }, {
    key: 'createInvaders',
    value: function createInvaders() {
      var ranks = this.game.config.invaderRanks;
      var files = this.game.config.invaderFiles;

      var invaders = [];
      for (var rank = 0; rank < ranks; rank++) {
        for (var file = 0; file < files; file++) {
          invaders.push(new _Invader2.default(this.game.width / 2 + (files / 2 - file) * 200 / files, this.game.boundaries.top + rank * 20, rank, file, 'Invader'));
        }
      }

      this.invaders = invaders;
      this.invaderCurrentVelocity = this.invaderInitialVelocity;
      this.invaderVelocity = { x: -this.invaderInitialVelocity, y: 0 };
      this.invaderNextVelocity = null;
    }
  }, {
    key: 'fireRocket',
    value: function fireRocket() {
      if (this.lastRocketTime === null || new Date().valueOf() - this.lastRocketTime > 1000 / this.game.config.rocketMaxFireRate) {
        this.rockets.push(new _Rocket2.default(this.ship.x, this.ship.y - 12, this.game.config.rocketVelocity));
        this.lastRocketTime = new Date().valueOf();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.game.pressedKeys[37]) {
        this.ship.x -= this.shipSpeed * this.dt;
      }

      if (this.game.pressedKeys[39]) {
        this.ship.x += this.shipSpeed * this.dt;
      }

      if (this.game.pressedKeys[32]) {
        this.fireRocket();
      }

      if (this.ship.x < this.game.boundaries.left) {
        this.ship.x = this.game.boundaries.left;
      }
      if (this.ship.x > this.game.boundaries.right) {
        this.ship.x = this.game.boundaries.right;
      }

      this.updateBombs();
      this.updateRockets();
      this.updateInvaders();
      this.detectCollisions();

      if (this.game.lives <= 0) {
        this.explodeSound.play();
        this.game.state = new _GameOverState2.default(this.game, this.ctx);
        return;
      }

      if (this.invaders.length === 0) {
        this.game.score += this.level * 50;
        this.game.level += 1;
        this.game.state = new _PreloadState2.default(this.game, this.ctx, this.game.level);
        return;
      }

      this.dropBombs();
      this.draw();
    }
  }, {
    key: 'updateBombs',
    value: function updateBombs() {
      for (var i = 0; i < this.bombs.length; i++) {
        var bomb = this.bombs[i];
        bomb.y += this.dt * bomb.velocity;

        if (bomb.y > this.height) {
          this.bombs.splice(i--, 1);
        }
      }
    }
  }, {
    key: 'updateRockets',
    value: function updateRockets() {
      for (var i = 0; i < this.rockets.length; i++) {
        var rocket = this.rockets[i];
        rocket.y -= this.dt * rocket.velocity;

        if (rocket.y < 0) {
          this.rockets.splice(i--, 1);
        }
      }
    }
  }, {
    key: 'updateInvaders',
    value: function updateInvaders() {
      var hitLeft = false;
      var hitRight = false;
      var hitBottom = false;
      for (var i = 0; i < this.invaders.length; i++) {
        var invader = this.invaders[i];
        var newx = invader.x + this.invaderVelocity.x * this.dt;
        var newy = invader.y + this.invaderVelocity.y * this.dt;
        if (hitLeft === false && newx < this.game.boundaries.left) {
          hitLeft = true;
        } else if (hitRight === false && newx > this.game.boundaries.right) {
          hitRight = true;
        } else if (hitBottom === false && newy > this.game.boundaries.bottom) {
          hitBottom = true;
        }

        if (!hitLeft && !hitRight && !hitBottom) {
          invader.x = newx;
          invader.y = newy;
        }
      }

      if (this.invadersAreDropping) {
        this.invaderCurrentDropDistance += this.invaderVelocity.y * this.dt;
        if (this.invaderCurrentDropDistance >= this.game.config.invaderDropDistance) {
          this.invadersAreDropping = false;
          this.invaderVelocity = this.invaderNextVelocity;
          this.invaderCurrentDropDistance = 0;
        }
      }

      if (hitLeft) {
        this.invaderCurrentVelocity += this.game.config.invaderAcceleration;
        this.invaderVelocity = { x: 0, y: this.invaderCurrentVelocity };
        this.invadersAreDropping = true;
        this.invaderNextVelocity = { x: this.invaderCurrentVelocity, y: 0 };
      }

      if (hitRight) {
        this.invaderCurrentVelocity += this.game.config.invaderAcceleration;
        this.invaderVelocity = { x: 0, y: this.invaderCurrentVelocity };
        this.invadersAreDropping = true;
        this.invaderNextVelocity = { x: -this.invaderCurrentVelocity, y: 0 };
      }

      if (hitBottom) {
        this.lives = 0;
      }
    }
  }, {
    key: 'detectCollisions',
    value: function detectCollisions() {
      for (var i = 0; i < this.invaders.length; i++) {
        var invader = this.invaders[i];
        var bang = false;

        for (var j = 0; j < this.rockets.length; j++) {
          var rocket = this.rockets[j];

          if (rocket.x >= invader.x - invader.width / 2 && rocket.x <= invader.x + invader.width / 2 && rocket.y >= invader.y - invader.height / 2 && rocket.y <= invader.y + invader.height / 2) {
            this.rockets.splice(j--, 1);
            bang = true;
            this.game.score += this.game.config.pointsPerInvader;
            this.popSound.pause();
            this.popSound.currentTime = 0;
            this.popSound.play();
            break;
          }
        }
        if (bang) {
          this.invaders.splice(i--, 1);
        }
      }

      for (var _i3 = 0; _i3 < this.bombs.length; _i3++) {
        var bomb = this.bombs[_i3];
        if (bomb.x >= this.ship.x - this.ship.width / 2 && bomb.x <= this.ship.x + this.ship.width / 2 && bomb.y >= this.ship.y - this.ship.height / 2 && bomb.y <= this.ship.y + this.ship.height / 2) {
          this.bombs.splice(_i3--, 1);
          this.game.lives--;
        }
      }

      for (var _i4 = 0; _i4 < this.invaders.length; _i4++) {
        var _invader = this.invaders[_i4];
        if (_invader.x + _invader.width / 2 > this.ship.x - this.ship.width / 2 && _invader.x - _invader.width / 2 < this.ship.x + this.ship.width / 2 && _invader.y + _invader.height / 2 > this.ship.y - this.ship.height / 2 && _invader.y - _invader.height / 2 < this.ship.y + this.ship.height / 2) {
          //  Dead by collision!
          this.game.lives = 0;
        }
      }
    }
  }, {
    key: 'dropBombs',
    value: function dropBombs() {
      var frontRankInvaders = {};
      for (var i = 0; i < this.invaders.length; i++) {
        var invader = this.invaders[i];
        //  If we have no invader for game file, or the invader
        //  for game file is futher behind, set the front
        //  rank invader to game one.
        if (!frontRankInvaders[invader.file] || frontRankInvaders[invader.file].rank < invader.rank) {
          frontRankInvaders[invader.file] = invader;
        }
      }

      //  Give each front rank invader a chance to drop a bomb.
      for (var _i5 = 0; _i5 < this.game.config.invaderFiles; _i5++) {
        var _invader2 = frontRankInvaders[_i5];
        if (!_invader2) continue;
        var chance = this.bombRate * this.dt;
        if (chance > Math.random()) {
          //  Fire!
          this.bombs.push(new _Bomb2.default(_invader2.x, _invader2.y + _invader2.height / 2, this.bombMinVelocity + Math.random() * (this.bombMaxVelocity - this.bombMinVelocity)));
        }
      }
    }
  }]);

  return PlayState;
}(_State3.default);

exports.default = PlayState;

},{"./Bomb":2,"./GameOverState":4,"./Invader":7,"./PreloadState":10,"./Renderer":11,"./Rocket":12,"./Ship":13,"./State":15}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _State2 = require('./State');

var _State3 = _interopRequireDefault(_State2);

var _PlayState = require('./PlayState');

var _PlayState2 = _interopRequireDefault(_PlayState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreloadState = function (_State) {
  _inherits(PreloadState, _State);

  function PreloadState(game, ctx) {
    var level = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

    _classCallCheck(this, PreloadState);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PreloadState).call(this, game, ctx));

    _this.countDown = 3;
    _this.level = level;
    return _this;
  }

  _createClass(PreloadState, [{
    key: 'draw',
    value: function draw() {
      //  Clear the background.
      this.ctx.clearRect(0, 0, this.game.width, this.game.height);

      this.ctx.font = '30px Arial';
      this.ctx.fillStyle = '#ffffff';
      this.ctx.textBaseline = 'middle';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Level ' + this.level.toString(), this.game.width / 2, this.game.height / 2 - 40);
      this.ctx.font = '24px Arial';
      this.ctx.fillText('Ready in ' + this.countDown.toString(), this.game.width / 2, this.game.height / 2);
    }
  }, {
    key: 'enter',
    value: function enter() {
      this.draw();
      this.intervalID = setInterval(this.update.bind(this), 1000);
    }
  }, {
    key: 'update',
    value: function update() {
      this.countDown--;

      if (this.intervalID && this.countDown <= 0) {
        clearInterval(this.intervalID);
        this.game.state = new _PlayState2.default(this.game, this.ctx, this.level);
        return;
      }

      this.draw();
    }
  }]);

  return PreloadState;
}(_State3.default);

exports.default = PreloadState;

},{"./PlayState":9,"./State":15}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (f) {
  window.setTimeout(f, 1e3 / 60);
};

var Renderer = function () {
  function Renderer(updateFun) {
    var fps = arguments.length <= 1 || arguments[1] === undefined ? 30 : arguments[1];

    _classCallCheck(this, Renderer);

    this.fps = fps;
    this.now = null;
    this.then = Date.now();
    this.interval = 1000 / fps;
    this.delta = null;
    this.updateFun = updateFun;
    this.paused = false;
    this.stopped = false;
  }

  _createClass(Renderer, [{
    key: "redraw",
    value: function redraw() {
      if (this.stopped === true) return; // stop updating;
      requestAnimationFrame(this.redraw.bind(this));

      this.now = Date.now();
      this.delta = this.now - this.then;

      if (this.delta > this.interval && this.paused === false) {
        this.then = this.now - this.delta % this.interval;
        this.updateFun();
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      this.paused = true;
    }
  }, {
    key: "unpause",
    value: function unpause() {
      this.paused = false;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.stopped = true;
    }
  }, {
    key: "start",
    value: function start() {
      this.stopped = false;
      this.redraw();
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Obj2 = require('./Obj');

var _Obj3 = _interopRequireDefault(_Obj2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rocket = function (_Obj) {
  _inherits(Rocket, _Obj);

  function Rocket(x, y, velocity) {
    _classCallCheck(this, Rocket);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rocket).call(this, x, y));

    _this.velocity = velocity;
    return _this;
  }

  return Rocket;
}(_Obj3.default);

exports.default = Rocket;

},{"./Obj":8}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Obj2 = require('./Obj');

var _Obj3 = _interopRequireDefault(_Obj2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ship = function (_Obj) {
  _inherits(Ship, _Obj);

  function Ship(x, y) {
    _classCallCheck(this, Ship);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Ship).call(this, x, y));

    _this.width = 20;
    _this.height = 16;
    return _this;
  }

  return Ship;
}(_Obj3.default);

exports.default = Ship;

},{"./Obj":8}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Obj2 = require('./Obj');

var _Obj3 = _interopRequireDefault(_Obj2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Star = function (_Obj) {
  _inherits(Star, _Obj);

  function Star(x, y, size, velocity) {
    _classCallCheck(this, Star);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Star).call(this, x, y));

    _this.size = size;
    _this.velocity = velocity;
    return _this;
  }

  return Star;
}(_Obj3.default);

exports.default = Star;

},{"./Obj":8}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = function State(game, ctx) {
  _classCallCheck(this, State);

  this.game = game;
  this.ctx = ctx;
};

exports.default = State;

},{}],16:[function(require,module,exports){
'use strict';

var _Background = require('./Background');

var _Background2 = _interopRequireDefault(_Background);

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

var _Highscore = require('./Highscore');

var _Highscore2 = _interopRequireDefault(_Highscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function showScores() {
  var highscore = new _Highscore2.default();
  var scoreboard = document.querySelector('#scoreboard');
  scoreboard.innerHTML = '';
  highscore.ranking.forEach(function (rank) {
    var li = document.createElement('li');
    var name = document.createElement('span');
    var info = document.createElement('p');
    li.className = 'collection-item';
    name.className = 'title';
    name.innerHTML = rank.name;
    info.innerHTML = 'Email: ' + rank.address + ', Score: ' + rank.score;
    scoreboard.appendChild(li);
    li.appendChild(name);
    li.appendChild(info);
  });
}

window.onload = function () {
  $('#menu li').click(function (e) {
    var next = e.target.getAttribute('data-target');
    // if offline, disable all subpages - allow only game playing
    if (!window.navigator.onLine) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (next === 'rules') {
      e.preventDefault();
      e.stopPropagation();
      $('#rules').openModal();
      history.pushState('rules', 'Space Invaders | Rules', '#rules');
    } else if (next === 'hs') {
      e.preventDefault();
      e.stopPropagation();
      $('#highscores').openModal();
      showScores();
      history.pushState('hs', 'Space Invaders | Highscores', '#highscores');
    }
  });

  var container = document.querySelector('#main-container');
  var bg = new _Background2.default('main-container', container.offsetWidth, container.offsetHeight);
  var game = new _Game2.default('gameboard');
  bg.start();
  game.play();
};

window.onpopstate = function (e) {
  if (e.state === 'rules') {
    $('#rules').openModal();
  } else if (e.state === 'hs') {
    $('#highscores').openModal();
  }
};

// Detect online status and visually disable the subsection navigation
window.addEventListener('online', function () {
  var navLinks = document.querySelectorAll('nav li a');
  navLinks.forEach(function (el) {
    el.style = '';
  });
});

window.addEventListener('offline', function () {
  var navLinks = document.querySelectorAll('nav li a');
  navLinks.forEach(function (el) {
    el.style = 'text-decoration: line-through; cursor: default';
  });
});

},{"./Background":1,"./Game":3,"./Highscore":5}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  gameWidth: 300,
  gameHeight: 400,
  fps: 30,
  bombRate: 0.05,
  bombMinVelocity: 50,
  bombMaxVelocity: 50,
  invaderInitialVelocity: 25,
  invaderAcceleration: 0,
  invaderDropDistance: 20,
  rocketVelocity: 120,
  rocketMaxFireRate: 2,
  debugMode: false,
  invaderRanks: 5,
  invaderFiles: 10,
  shipSpeed: 120,
  levelDifficultyMultiplier: 0.2,
  pointsPerInvader: 5
};

},{}]},{},[16]);
