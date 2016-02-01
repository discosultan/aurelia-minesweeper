import {inject} from 'aurelia-framework';
import 'fetch';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class RemoteLeaderboardStorage {
  constructor(http) {
    http.configure(config => {
      config.withBaseUrl('//localhost:3000/');
      config.rejectErrorResponses();
    });

    this._http = http;
  }

  isAvailable() {
    return new Promise((resolve, reject) => {
      this._http.fetch('test').then(
        res => resolve(),
        err => { console.log(`Testing remote connection failed: ${err}`); reject(); });
    });
  }

  get() {
    return new Promise((resolve, reject) => {
      this._http.fetch('leaderboard').then(
        res => resolve(res.json()),
        err => { console.log(`Getting leaderboard failed: ${err}`); reject(err); });
    });
  }

  push(submission) {
    return new Promise((resolve, reject) => {
      console.log(json(submission));
      this._http.fetch('leaderboard', { method: 'post', body: json(submission) }).then(
        res => resolve(),
        err => { console.log(`Pushing leaderboard submission failed: ${err}`); reject(); }
      )
    });
  }
}
