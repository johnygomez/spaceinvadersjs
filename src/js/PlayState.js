import Bomb from './Bomb';
import Invader from './Invader';
import Renderer from './Renderer';
import Rocket from './Rocket';
import State from './State';
import Ship from './Ship';

import GameOverState from './GameOverState';
import PreloadState from './PreloadState';

export default class PlayState extends State {
  constructor(game, ctx, level) {
    super(game, ctx);

    //  Game state.
    this.invaderCurrentVelocity = 10;
    this.invaderCurrentDropDistance = 0;
    this.invadersAreDropping = false;
    this.lastRocketTime = null;

    //  Game entities.
    this.ship = null;
    this.invaders = [];
    this.rockets = [];
    this.bombs = [];
    this.dt = 1 / this.game.config.fps;
    this.level = level;

    this.popSound = new Audio('/audio/invaderkilled.wav');
    this.explodeSound = new Audio('/audio/explosion.wav');
    this.shootSound = new Audio('/audio/shoot.wav');
    this.renderer = new Renderer(this.update.bind(this));
  }

  draw() {
    this.ctx.clearRect(0, 0, this.game.width, this.game.height);

    // Draw score
    this.ctx.font='12px Arial';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.textBaseline='top';
    this.ctx.textAlign='left';
    this.ctx.fillText('Score: ' + this.game.score, 5, 0);

    this.ctx.textBaseline='top';
    this.ctx.textAlign='right';
    this.ctx.fillText('Lives: ' + this.game.lives, this.game.width - 5, 0);

    //  Draw ship.
    this.ctx.fillStyle = '#999999';
    this.ctx.fillRect(this.ship.x - (this.ship.width / 2), this.ship.y - (this.ship.height / 2), this.ship.width, this.ship.height);

    //  Draw invaders.
    this.ctx.fillStyle = '#006600';
    for (let i = 0; i < this.invaders.length; i++) {
      const invader = this.invaders[i];
      this.ctx.fillRect(invader.x - invader.width / 2, invader.y - invader.height / 2, invader.width, invader.height);
    }

    //  Draw bombs.
    this.ctx.fillStyle = '#ff5555';
    for (let i = 0; i < this.bombs.length; i++) {
      const bomb = this.bombs[i];
      this.ctx.fillRect(bomb.x - 2, bomb.y - 2, 4, 4);
    }

    //  Draw rockets.
    this.ctx.fillStyle = '#ff0000';
    for (let i = 0; i < this.rockets.length; i++) {
      const rocket = this.rockets[i];
      this.ctx.fillRect(rocket.x, rocket.y - 2, 1, 4);
    }
  }

  enter() {
    this.ship = new Ship(this.game.width / 2, this.game.boundaries.bottom);
    this.initLevel();
    this.createInvaders();
    this.renderer.redraw();
  }

  leave() {
    this.renderer.stop();
    this.renderer = null;
  }

  initLevel() {
    const levelMultiplier = this.level * this.game.config.levelDifficultyMultiplier;
    this.shipSpeed = this.game.config.shipSpeed;
    this.invaderInitialVelocity = this.game.config.invaderInitialVelocity + (levelMultiplier * this.game.config.invaderInitialVelocity);
    this.bombRate = this.game.config.bombRate + (levelMultiplier * this.game.config.bombRate);
    this.bombMinVelocity = this.game.config.bombMinVelocity + (levelMultiplier * this.game.config.bombMinVelocity);
    this.bombMaxVelocity = this.game.config.bombMaxVelocity + (levelMultiplier * this.game.config.bombMaxVelocity);
  }

  createInvaders() {
    const ranks = this.game.config.invaderRanks;
    const files = this.game.config.invaderFiles;

    const invaders = [];
    for (let rank = 0; rank < ranks; rank++) {
      for (let file = 0; file < files; file++) {
        invaders.push(new Invader(
          (this.game.width / 2) + ((files / 2 - file) * 200 / files),
          (this.game.boundaries.top + rank * 20),
          rank, file, 'Invader'));
      }
    }

    this.invaders = invaders;
    this.invaderCurrentVelocity = this.invaderInitialVelocity;
    this.invaderVelocity = { x: -this.invaderInitialVelocity, y: 0 };
    this.invaderNextVelocity = null;
  }

  fireRocket() {
    if (this.lastRocketTime === null || ((new Date()).valueOf() - this.lastRocketTime) > (1000 / this.game.config.rocketMaxFireRate)) {
      this.rockets.push(new Rocket(this.ship.x, this.ship.y - 12, this.game.config.rocketVelocity));
      this.lastRocketTime = (new Date()).valueOf();
      this.shootSound.currentTime = 0;
      this.shootSound.play();
    }
  }

  update() {
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
      this.game.state = new GameOverState(this.game, this.ctx);
      return;
    }

    if (this.invaders.length === 0) {
      this.game.score += this.level * 50;
      this.game.level += 1;
      this.game.state = new PreloadState(this.game, this.ctx, this.game.level);
      return;
    }

    this.dropBombs();
    this.draw();
  }

  updateBombs() {
    for (let i = 0; i < this.bombs.length; i++) {
      const bomb = this.bombs[i];
      bomb.y += this.dt * bomb.velocity;

      if (bomb.y > this.height) {
        this.bombs.splice(i--, 1);
      }
    }
  }

  updateRockets() {
    for (let i = 0; i < this.rockets.length; i++) {
      const rocket = this.rockets[i];
      rocket.y -= this.dt * rocket.velocity;

      if (rocket.y < 0) {
        this.rockets.splice(i--, 1);
      }
    }
  }

  updateInvaders() {
    let hitLeft = false;
    let hitRight = false;
    let hitBottom = false;
    for (let i = 0; i < this.invaders.length; i++) {
      const invader = this.invaders[i];
      const newx = invader.x + this.invaderVelocity.x * this.dt;
      const newy = invader.y + this.invaderVelocity.y * this.dt;
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

  detectCollisions() {
    for (let i = 0; i < this.invaders.length; i++) {
      const invader = this.invaders[i];
      let bang = false;

      for (let j = 0; j < this.rockets.length; j++) {
        const rocket = this.rockets[j];

        if (rocket.x >= (invader.x - invader.width / 2) && rocket.x <= (invader.x + invader.width / 2) &&
          rocket.y >= (invader.y - invader.height / 2) && rocket.y <= (invader.y + invader.height / 2)) {
          this.rockets.splice(j--, 1);
          bang = true;
          this.game.score += this.game.config.pointsPerInvader;
          // this.popSound.pause();
          this.popSound.currentTime = 0;
          this.popSound.play();
          break;
        }
      }
      if (bang) {
        this.invaders.splice(i--, 1);
      }
    }

    for (let i = 0; i < this.bombs.length; i++) {
      const bomb = this.bombs[i];
      if (bomb.x >= (this.ship.x - this.ship.width / 2) && bomb.x <= (this.ship.x + this.ship.width / 2) &&
        bomb.y >= (this.ship.y - this.ship.height / 2) && bomb.y <= (this.ship.y + this.ship.height / 2)) {
        this.bombs.splice(i--, 1);
        this.game.lives--;
      }
    }

    for (let i = 0; i < this.invaders.length; i++) {
      const invader = this.invaders[i];
      if ((invader.x + invader.width / 2) > (this.ship.x - this.ship.width / 2) &&
        (invader.x - invader.width / 2) < (this.ship.x + this.ship.width / 2) &&
        (invader.y + invader.height / 2) > (this.ship.y - this.ship.height / 2) &&
        (invader.y - invader.height / 2) < (this.ship.y + this.ship.height / 2)) {
        //  Dead by collision!
        this.game.lives = 0;
      }
    }
  }

  dropBombs() {
    const frontRankInvaders = {};
    for (let i = 0; i < this.invaders.length; i++) {
      const invader = this.invaders[i];
      //  If we have no invader for game file, or the invader
      //  for game file is futher behind, set the front
      //  rank invader to game one.
      if (!frontRankInvaders[invader.file] || frontRankInvaders[invader.file].rank < invader.rank) {
        frontRankInvaders[invader.file] = invader;
      }
    }

    //  Give each front rank invader a chance to drop a bomb.
    for (let i = 0; i < this.game.config.invaderFiles; i++) {
      const invader = frontRankInvaders[i];
      if (!invader) continue;
      const chance = this.bombRate * this.dt;
      if (chance > Math.random()) {
        //  Fire!
        this.bombs.push(new Bomb(invader.x, invader.y + invader.height / 2,
          this.bombMinVelocity + Math.random() * (this.bombMaxVelocity - this.bombMinVelocity)));
      }
    }
  }
}
