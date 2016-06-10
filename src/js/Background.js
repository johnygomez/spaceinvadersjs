import Star from './Star';
import Renderer from './Renderer';

export default class Background {
  constructor(container, width = 224, height = 256, numOfStars = 50) {
    let el = document.getElementById(container);
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
    this.renderer = new Renderer(this.update.bind(this));
  }

  initStars() {
    for (let i = 0; i < this.numStars; i++) {
      this.stars[i] = new Star(Math.random() * this.width,
        Math.random() * this.height,
        Math.random() * 3 + 1,
        (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity);
    }
  }

  update() {
    let ctx = this.canvas.getContext("2d");
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < this.stars.length; i++) {
      let star = this.stars[i];
      star.y += star.velocity;
      //  If the star has moved from the bottom of the screen, spawn it at the top.
      if (star.y > this.height) {
        this.stars[i] = new Star(Math.random() * this.width, 0, Math.random() * 3 + 1,
          (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity);
      }

      ctx.fillRect(star.x, star.y, star.size, star.size);
    }
  }

  start() {
    this.renderer.redraw();
  }
}