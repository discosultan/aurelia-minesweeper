export class LocalHighscoreStorage {
  _key = 'highscores';

  constructor() {
      this._storage = window.localStorage; // TODO: extract dependency from window object.
  }

  isAvailable() {
    return new Promise((resolve, reject) => {
      if (this._storage)
        resolve();
      else
        reject();
    });
  }

  get() {
    return new Promise((resolve, reject) => {
      if (this._storage) {
        let storageBlob = JSON.parse(this._storage.getItem(this._key));
        resolve(storageBlob);
      } else {
        reject();
      }
    });
  }
  //
  // set(key, value) {
  //     if (this._storage)
  //         this._storage.setItem(key, JSON.stringify(value));
  // }
  //
  add(submission) {
    return new Promise((resolve, reject) => {
      if (this._storage) {
        // let values = this.get(key);
        // values.push(value);
        // this.set(key, value);
        resolve();
      } else {
        reject();
      }
    });
  }
}
