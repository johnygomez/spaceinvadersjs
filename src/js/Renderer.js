window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function(f) {
    window.setTimeout(f, 1e3 / 60);
  };

// Universal class for rendering/updating at given FPS
export default class Renderer {
  constructor(updateFun, fps = 30) {
    this.fps = fps;
    this.now = null;
    this.then = Date.now();
    this.interval = 1000 / fps;
    this.delta = null;
    // function which will be called to update the state
    this.updateFun = updateFun;
    // Renderer state variables
    this.paused = false;
    this.stopped = false;
  }

  redraw() {
    if (this.stopped === true) return; // stop updating
    // Browser will try to call this at 60fps
    requestAnimationFrame(this.redraw.bind(this));

    this.now = Date.now();
    this.delta = this.now - this.then;

    // We need to update the state only at FPS intervals (not 60fps)
    // So skip unnecessary updates
    if (this.delta > this.interval && this.paused === false) {
      // interval difference
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
