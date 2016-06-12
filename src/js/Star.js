import Obj from './Obj';

// Star object for animated background
export default class Star extends Obj {
  constructor(x, y, size, velocity, type = 0) {
    super(x, y);
    this.size = size;
    this.velocity = velocity;
    this.type = type;
    this.gfx = [{
      posX: 307,
      posY: 488,
      height: 8,
      width: 7
    }, {
      posX: 319,
      posY: 484,
      height: 12,
      width: 12
    }, {
      posX: 339,
      posY: 499,
      height: 18,
      width: 18
    }, {
      posX: 370,
      posY: 541,
      height: 24,
      width: 33
    }];
  }
}