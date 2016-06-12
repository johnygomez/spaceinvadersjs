import Obj from './Obj';

// Represents bombs dropped by invvaders
export default class Bomb extends Obj {
  // Param velocity - bomb speed
  constructor(x, y, velocity) {
    super(x, y);
    this.velocity = velocity;
  }
}
