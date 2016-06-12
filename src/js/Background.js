import Star from './Star';
import Renderer from './Renderer';

// Class representing and drawing animated background (stars)
export default class Background {
  constructor(container, width = 300, height = 400, numOfStars = 50) {
    const el = document.getElementById(container);
    this.canvas = document.createElement('canvas');
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.id = 'bg-canvas';
    // Star speed interval
    this.minVelocity = 0.1;
    this.maxVelocity = 0.5;
    // Star pool
    this.stars = [];
    this.numStars = numOfStars;
    // insert at the beginning of DOM
    el.insertBefore(this.canvas, el.firstChild);

    this.initStars();
    this.renderer = new Renderer(this.update.bind(this));
  }

  // Create stars at random positions with random size
  initStars() {
    this.asteroidImg = document.createElement('img');
    this.asteroidImg.src = 'images/sprite-transparent.png';

    for (let i = 0; i < this.numStars; i++) {
      this.stars[i] = new Star(Math.random() * this.width,
        Math.random() * this.height,
        Math.random() * 3 + 1,
        (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity,
        this.getRandomInt(0, 3));
    }
  }

  // draw each star on canvas
  update() {
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#000017';
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.x += star.velocity;
      //  If the star has moved from the bottom of the screen, spawn it at the top.
      if (star.x > this.width) {
        this.stars[i] = new Star(0,
          Math.random() * this.height,
          Math.random() * 3 + 1,
          (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity,
          this.getRandomInt(0, 3));
      }

      ctx.drawImage(this.asteroidImg,
        star.gfx[star.type].posX,
        star.gfx[star.type].posY,
        star.gfx[star.type].width,
        star.gfx[star.type].height,
        star.x - (star.gfx[star.type].width / 2),
        star.y - (star.gfx[star.type].height / 2),
        star.gfx[star.type].width,
        star.gfx[star.type].height);
    }
  }

  // Start the canvas animation
  start() {
    this.renderer.redraw();
  }

  // generates random integer in given interval
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
