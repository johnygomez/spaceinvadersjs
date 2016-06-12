import Obj from './Obj';

// Represents bombs dropped by invvaders
export default class Bomb extends Obj {
  // Param velocity - bomb speed
  constructor(x, y, velocity) {
    super(x, y);
    this.velocity = velocity;
    this.width = 5;
    this.height = 5;
    this.gfx = {
      posX: 374,
      posY: 306,
      height: 12,
      width: 12
    }
  }
}
