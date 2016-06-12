import Obj from './Obj';

// Represents the Invader - inherits from Obj because it can be rendered in canvas
export default class Invader extends Obj {
  // Params x,y - position
  // Params rank,file - position in grid (col, row)
  // Param type - type of invader
  constructor(x, y, rank, file, type) {
    super(x, y);
    this.rank = rank;
    this.file = file;
    this.type = type;
    this.width = 18;
    this.height = 14;
  }
}
