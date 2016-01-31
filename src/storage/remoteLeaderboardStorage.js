import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class RemoteLeaderboardStorage {
  constructor(http) {
    http.configure(config => {
      config.withBaseUrl('//localhost:3000/');
    });

    this._http = http;
  }

  isAvailable() {
    return new Promise((resolve, reject) => {
      this._http.fetch('test').then(
        res => { console.log(res); resolve(); },
        err => { console.log(err); reject(); });
    });
  }

  get() {
    return new Promise((resolve, reject) => {
      this._http.fetch('leaderboard').then(
        res => { console.log(res); resolve(res.json()); },
        err => { console.log(err); reject(err); });
    });
  }

  push(submission) {
    return new Promise((resolve, reject) => {
      console.log(json(submission));
      this._http.fetch('leaderboard', { method: 'post', body: json(submission) }).then(
        res => { console.log(res); resolve(); },
        err => { console.log(err); reject(); }
      )
    });
  }
}
