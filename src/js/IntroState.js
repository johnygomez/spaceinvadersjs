import State from './State';
import PreloadState from './PreloadState';

export default class IntroState extends State {
  draw() {
    this.ctx.clearRect(0, 0, this.game.width, this.game.height);
    this.ctx.font='30px Arial';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.textBaseline='center';
    this.ctx.textAlign='center';
    this.ctx.fillText('Space Invaders', this.game.width / 2, this.game.height/2 - 40);
    this.ctx.font='16px Arial';
    this.ctx.fillText('Press \'Enter\' to start.', this.game.width / 2, this.game.height/2);
  }

  enter() {
    this.draw();
  }

  keyDown(keyCode) {
    if (keyCode === 13) {
        //  Enter starts the game.
        this.game.state = new PreloadState(this.game, this.ctx);
    }
  }
}