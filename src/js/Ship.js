import Obj from './Obj';

// Player's spaceship
export default class Ship extends Obj {
  constructor(x, y) {
    super(x, y);
    this.width = 20;
    this.height = 16;
  }
}
