import State from './State';

export default class PreloadState extends State {
  constructor(game, ctx) {
    super(game, ctx);
    this.countDown = 3;
    this.level = 1;
  }

  draw() {
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

  enter() {
    this.draw();
    this.intervalID = setInterval(this.update.bind(this), 1000);
  }

  update() {
    this.countDown--;

    if (this.intervalID && this.countDown <= 0) {
      clearInterval(this.intervalID);
      // play
    }

    this.draw();
  }
}
