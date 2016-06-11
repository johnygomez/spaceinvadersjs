import Obj from './Obj';

export default class Bomb extends Obj {
  constructor(x, y, velocity) {
    super(x, y);
    this.velocity = velocity;
  }
}
