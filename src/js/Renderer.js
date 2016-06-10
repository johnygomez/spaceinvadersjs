window.requestAnimationFrame = function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(f) {
      window.setTimeout(f,1e3/60);
    }
}();

export default class Renderer {
  constructor(updateFun, fps = 30) {
    this.fps = fps;
    this.now = null;
    this.then = Date.now();
    this.interval = 1000/fps;
    this.delta = null;
    this.updateFun = updateFun;
    this.paused = false;
    this.stopped = false;
  }

  redraw() {
    if (this.stopped === true) return; // stop updating;
    requestAnimationFrame(this.redraw.bind(this));
     
    this.now = Date.now();
    this.delta = this.now - this.then;
     
    if (this.delta > this.interval && this.paused === false) {
        this.then = this.now - (this.delta % this.interval);
        this.updateFun();
    }
  }

  pause() {
    this.paused = true;
  }

  unpause() {
    this.paused = false;
  }

  stop() {
    this.stopped = true;
  }

  start() {
    this.stopped = false;
    this.redraw();
  }
}