import Obj from './Obj';

// Rocket object - player's ship projectiles
export default class Rocket extends Obj {
  constructor(x, y, velocity) {
    super(x, y);
    this.velocity = velocity;
  }
}
