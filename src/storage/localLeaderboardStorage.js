export class LocalLeaderboardStorage {
  _key = 'leaderboard_v1';

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
        let leaderboard = this._getBlob();
        resolve(leaderboard);
      } else {
        reject();
      }
    });
  }

  push(submission) {
    return new Promise((resolve, reject) => {
      if (this._storage) {
        let leaderboard = this._getBlob();
        if (!leaderboard)
          leaderboard = { all: {} };

        let scores = leaderboard.all[submission.difficulty];
        if (!scores) {
          scores = [];
          leaderboard.all[submission.difficulty] = scores;
        }
        scores.push(submission);
        this._storage.setItem(this._key, JSON.stringify(leaderboard));
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
