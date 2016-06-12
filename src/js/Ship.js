import Obj from './Obj';

// Player's spaceship
export default class Ship extends Obj {
  constructor(x, y) {
    super(x, y);
    this.width = 55;
    this.height = 35;
    this.gfx = {
      posX: 40,
      posY: 300,
      height: 35,
      width: 55
    }
  }
}
