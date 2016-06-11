import Obj from './Obj';

export default class Rocket extends Obj {
  constructor(x, y, velocity) {
    super(x, y);
    this.velocity = velocity;
  }
}
