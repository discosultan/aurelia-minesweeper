export class Timer {
  constructor(action, interval) {
    this.action = action;
    this.interval = interval;
    this._windowIntervalHandle = null;
  }

  start() {
    if (this._windowIntervalHandle)
      this.stop();
    this._windowIntervalHandle = window.setInterval(this.action, this.interval); // TODO: extract dependency to window?
  }

  stop() {
    if (this._windowIntervalHandle) {
      window.clearInterval(this._windowIntervalHandle);
      this._windowIntervalHandle = null;
    }
  }
}
