export class Storage {
  constructor() {
      this._storage = window.localStorage;
  }

  get(key) {
      if (this._storage)
          return JSON.parse(this._storage.getItem(key));
  }

  set(key, value) {
      if (this._storage)
          this._storage.setItem(key, JSON.stringify(value));
  }
}
