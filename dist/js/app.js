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
    var width = arguments.length <= 1 || arguments[1] === undefined ? 224 : arguments[1];
    var height = arguments.length <= 2 || arguments[2] === undefined ? 256 : arguments[2];
    var numOfStars = arguments.length <= 3 || arguments[3] === undefined ? 50 : arguments[3];

    _classCallCheck(this, Background);

    var el = document.getElementById(container);
    this.canvas = document.createElement('canvas');
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.id = "bg-canvas";
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
      var ctx = this.canvas.getContext("2d");
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, this.width, this.height);

      ctx.fillStyle = '#ffffff';
      for (var i = 0; i < this.stars.length; i++) {
        var star = this.stars[i];
        star.y += star.velocity;
        //  If the star has moved from the bottom of the screen, spawn it at the top.
        if (star.y > this.height) {
          this.stars[i] = new _Star2.default(Math.random() * this.width, 0, Math.random() * 3 + 1, Math.random() * (this.maxVelocity - this.minVelocity) + this.minVelocity);
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

},{"./Renderer":5,"./Star":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Background = require('./Background');

var _Background2 = _interopRequireDefault(_Background);

var _Renderer = require('./Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

var _IntroState = require('./IntroState');

var _IntroState2 = _interopRequireDefault(_IntroState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(gameboardID) {
    _classCallCheck(this, Game);

    this.gameboard = document.getElementById(gameboardID);

    // Set the initial config.
    this.config = {
      gameWidth: 300,
      gameHeight: 400,
      fps: 30
    };

    this.mainCanvas = document.createElement('canvas');
    this.mainCanvas.width = this.config.gameWidth;
    this.mainCanvas.height = this.config.gameHeight;
    this.mainCanvas.id = 'main-canvas';
    this.width = this.config.gameWidth;
    this.height = this.config.gameHeight;
    this.gameboard.appendChild(this.mainCanvas);
    this.bg = new _Background2.default(gameboardID, this.config.gameWidth, this.config.gameHeight);

    // All state is in the variables below.
    this.lives = 3;
    this.boundaries = {
      left: this.mainCanvas.width / 2 - this.config.gameWidth / 2,
      right: this.mainCanvas.width / 2 + this.config.gameWidth / 2,
      top: this.mainCanvas.height / 2 - this.config.gameHeight / 2,
      bottom: this.mainCanvas.height / 2 + this.config.gameHeight / 2
    };

    //  The state stack.
    this.stateStack = [];

    //  Input/output
    this.pressedKeys = {};

    this.renderer = new _Renderer2.default(this.draw, this);
  }

  _createClass(Game, [{
    key: 'play',
    value: function play() {
      var _this = this;

      this.bg.start();

      window.addEventListener("keydown", function (e) {
        var keycode = e.which || window.event.keycode;
        //  Supress further processing of left/right/space (37/29/32)
        if (keycode === 37 || keycode === 39 || keycode === 32) {
          e.preventDefault();
        }

        _this.keyDown(keycode);
      });

      window.addEventListener("keyup", function (e) {
        var keycode = e.which || window.event.keycode;
        _this.keyUp(keycode);
      });

      this.state = new _IntroState2.default(this, this.mainCanvas.getContext('2d'));
      this.lives = 3;
      this.updateState();
    }
  }, {
    key: 'updateState',
    value: function updateState() {
      if (this.state) {
        this.state.draw();
      }
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
      delete this.pressedKeys[keyCode];

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

},{"./Background":1,"./IntroState":3,"./Renderer":5}],3:[function(require,module,exports){
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
      //  Clear the background.
      this.ctx.clearRect(0, 0, this.game.width, this.game.height);

      this.ctx.font = "30px Arial";
      this.ctx.fillStyle = '#ffffff';
      this.ctx.textBaseline = "center";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Space Invaders", this.game.width / 2, this.game.height / 2 - 40);
      this.ctx.font = "16px Arial";

      this.ctx.fillText("Press 'Enter' to start.", this.game.width / 2, this.game.height / 2);
    }
  }, {
    key: 'keyDown',
    value: function keyDown(keyCode) {
      if (keyCode === 13) {
        //  Enter starts the game.
        this.game.state = new _PreloadState2.default(this.game, this.ctx);
        console.log(this.game.bg.renderer);
        this.game.bg.renderer.stop();
      }
    }
  }]);

  return IntroState;
}(_State3.default);

exports.default = IntroState;

},{"./PreloadState":4,"./State":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _State2 = require('./State');

var _State3 = _interopRequireDefault(_State2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreloadState = function (_State) {
  _inherits(PreloadState, _State);

  function PreloadState(game, ctx) {
    _classCallCheck(this, PreloadState);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PreloadState).call(this, game, ctx));

    _this.countDown = 3;
    _this.level = 1;
    return _this;
  }

  _createClass(PreloadState, [{
    key: 'draw',
    value: function draw() {
      //  Clear the background.
      this.ctx.clearRect(0, 0, this.game.width, this.game.height);

      this.ctx.font = "30px Arial";
      this.ctx.fillStyle = '#ffffff';
      this.ctx.textBaseline = "middle";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Level " + this.level.toString(), this.game.width / 2, this.game.height / 2 - 40);
      this.ctx.font = "24px Arial";
      this.ctx.fillText("Ready in " + this.countDown.toString(), this.game.width / 2, this.game.height / 2);
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
        // play
      }

      this.draw();
    }
  }]);

  return PreloadState;
}(_State3.default);

exports.default = PreloadState;

},{"./State":7}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.requestAnimationFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (f) {
    window.setTimeout(f, 1e3 / 60);
  };
}();

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

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Star = function Star(x, y, size, velocity) {
  _classCallCheck(this, Star);

  this.x = x;
  this.y = y;
  this.size = size;
  this.velocity = velocity;
};

exports.default = Star;

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
'use strict';

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
  var game = new _Game2.default('gameboard');
  game.play();
};

},{"./Game":2}]},{},[8]);
