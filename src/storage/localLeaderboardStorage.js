export class LocalLeaderboardStorage {
  _key = 'leaderboard';

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
        let storageBlob = this._getBlob();
        resolve(storageBlob);
      } else {
        reject();
      }
    });
  }

  push(submission) {
    return new Promise((resolve, reject) => {
      if (this._storage) {
        let storageBlob = this._getBlob();
        if (!storageBlob)
          storageBlob = {};

        let scores = storageBlob[submission.settings.type];
        if (!scores) {
          scores = [];
          storageBlob[submission.settings.type] = scores;
        }
        scores.push(submission);
        this._storage.setItem(this._key, JSON.stringify(storageBlob));
        resolve();
      } else {
        reject();
      }
    });
  }

  _getBlob() {
    return JSON.parse(this._storage.getItem(this._key));
  }
}
