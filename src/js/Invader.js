import Obj from './Obj';

export default class Invader extends Obj {
  constructor(x, y, rank, file, type) {
    super(x, y);
    this.rank = rank;
    this.file = file;
    this.type = type;
    this.width = 18;
    this.height = 14;
  }
}
