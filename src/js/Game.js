import IntroState from './IntroState';
import Highscore from './Highscore';
import config from './config';

export default class Game {
  constructor(gameboardID) {
    this.gameboard = document.getElementById(gameboardID);
    this.highscore = new Highscore();

    // Set the initial config.
    this.config = config;
    this.width = this.config.gameWidth;
    this.height = this.config.gameHeight;

    // create game canvas and append to gameboard container
    this.mainCanvas = document.createElement('canvas');
    this.mainCanvas.width = this.width;
    this.mainCanvas.height = this.height;
    this.mainCanvas.id = 'main-canvas';
    this.gameboard.appendChild(this.mainCanvas);

    // All game state vars
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

    //  Contains info about currently pressed keys
    this.pressedKeys = {};
  }

  play() {
    // watch for keyboard press events
    window.addEventListener('keydown', (e) => {
      const keycode = e.which || window.event.keycode;
      //  Supress further processing of left/right/space (37/29/32) - game control keys
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

  // pause the game
  pause() {
    if (this.state.renderer) this.state.renderer.pause();
  }

  // unpause the game
  resume() {
    if (this.state.renderer) this.state.renderer.unpause();
  }

  // return current game state
  get state() {
    return this.stateStack.length > 0 ? this.stateStack[this.stateStack.length - 1] : null;
  }

  // set new game state
  set state(newState) {
    // remove current state (if exists)
    if (this.state) {

      if (this.state.leave) {
        // state can have some method to be called when leaving, e.g. save the score
        this.state.leave();
      }

      this.stateStack.pop();
    }

    // push new state to state stack and initialize it
    if (newState.enter) {
      newState.enter();
    }
    this.stateStack.push(newState);
  }

  keyDown(keyCode) {
    // when key is pressed (down) toggle it in the pressedKeys set
    this.pressedKeys[keyCode] = true;
    if (this.state && this.state.keyDown) {
      this.state.keyDown(keyCode);
    }
  }

  keyUp(keyCode) {
    // delete key from pressedKeys set when button is released
    delete this.pressedKeys.keyCode;
    
    if (this.state && this.state.keyUp) {
      this.state.keyUp(keyCode);
    }
  }
}
