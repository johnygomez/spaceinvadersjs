import Obj from './Obj';

export default class Star extends Obj {
  constructor(x, y, size, velocity) {
    super(x, y);
    this.size = size;
    this.velocity = velocity;
  }
}