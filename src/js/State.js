// Universal class for all game states
// It must contain current game instance to which it belongs, and also canvas context, where it can draw
export default class State {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }
}