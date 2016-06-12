import Obj from './Obj';

// Rocket object - player's ship projectiles
export default class Rocket extends Obj {
  constructor(x, y, velocity) {
    super(x, y);
    this.velocity = velocity;
    this.width = 2;
    this.height = 6;
    this.gfx = {
      posX: 319,
      posY: 321,
      height: 10,
      width: 3
    }
  }
}
