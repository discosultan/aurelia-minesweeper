export class Timer {
  _windowIntervalHandle = null;

  constructor(action, interval) {
    this.action = action;
    this.interval = interval;
  }

  start() {
    if (this._windowIntervalHandle)
      this.stop();
    this._windowIntervalHandle = window.setInterval(this.action, this.interval);
  }

  stop() {
    if (this._windowIntervalHandle) {
      window.clearInterval(this._windowIntervalHandle);
      this._windowIntervalHandle = null;
    }
  }
}
