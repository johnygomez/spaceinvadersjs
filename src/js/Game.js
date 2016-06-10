import Background from './Background';
import Renderer from './Renderer';
import IntroState from './IntroState';

export default class Game {
  constructor(gameboardID) {
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
    this.bg = new Background(gameboardID, this.config.gameWidth, this.config.gameHeight);

    // All state is in the variables below.
    this.lives = 3;
    this.boundaries = {
      left: this.mainCanvas.width / 2 - this.config.gameWidth / 2,
      right: this.mainCanvas.width / 2 + this.config.gameWidth / 2,
      top: this.mainCanvas.height / 2 - this.config.gameHeight / 2,
      bottom: this.mainCanvas.height / 2 + this.config.gameHeight / 2,
    };

    //  The state stack.
    this.stateStack = [];

    //  Input/output
    this.pressedKeys = {};

    this.renderer = new Renderer(this.draw, this);
  }

  play() {
    this.bg.start();
    
    window.addEventListener("keydown", (e) => {
      const keycode = e.which || window.event.keycode;
      //  Supress further processing of left/right/space (37/29/32)
      if (keycode === 37 || keycode === 39 || keycode === 32) {
        e.preventDefault();
      }

      this.keyDown(keycode);
    });

    window.addEventListener("keyup", (e) => {
      const keycode = e.which || window.event.keycode;
      this.keyUp(keycode);
    });

    this.state = new IntroState(this, this.mainCanvas.getContext('2d'));
    this.lives = 3;
    this.updateState();
  }

  updateState() {
    if (this.state) {
      this.state.draw();
    }
  }

  get state() {
    return this.stateStack.length > 0 ? this.stateStack[this.stateStack.length - 1] : null;
  }

  set state(newState) {
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

  keyDown(keyCode) {
    this.pressedKeys[keyCode] = true;
    if (this.state && this.state.keyDown) {
      this.state.keyDown(keyCode);
    }
  }

  keyUp(keyCode) {
    delete this.pressedKeys[keyCode];

    if (this.state && this.state.keyUp) {
      this.state.keyUp(keyCode);
    }
  }
}
