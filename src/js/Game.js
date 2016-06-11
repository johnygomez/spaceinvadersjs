import IntroState from './IntroState';
import Highscore from './Highscore';
import config from './config';

export default class Game {
  constructor(gameboardID) {
    this.gameboard = document.getElementById(gameboardID);
    this.highscore = new Highscore();

    // Set the initial config.
    this.config = config
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

  play() {
    window.addEventListener('keydown', (e) => {
      const keycode = e.which || window.event.keycode;
      //  Supress further processing of left/right/space (37/29/32)
      if (keycode === 37 || keycode === 39 || keycode === 32) {
        e.preventDefault();
      }

      this.keyDown(keycode);
    });

    window.addEventListener('keyup', (e) => {
      const keycode = e.which || window.event.keycode;
      this.keyUp(keycode);
    });

    this.lives = 3;
    this.state = new IntroState(this, this.mainCanvas.getContext('2d'));
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
    Reflect.deleteProperty(this.pressedKeys, keyCode);

    if (this.state && this.state.keyUp) {
      this.state.keyUp(keyCode);
    }
  }
}
