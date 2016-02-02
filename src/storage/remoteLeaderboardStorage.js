import 'fetch';
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class RemoteLeaderboardStorage {
  constructor(http) {
    http.configure(config => {
      config.withBaseUrl('//jwin.cloudapp.net:3000/');
      config.rejectErrorResponses();
    });

    this._http = http;
  }

  isAvailable() {
    return new Promise((resolve, reject) => {
      this._http.fetch('test').then(
        res => resolve(),
        err => reject(err));
    });
  }

  get() {
    return new Promise((resolve, reject) => {
      this._http.fetch('leaderboard').then(
        res => resolve(res.json()),
        err => reject(err));
    });
  }

  push(submission) {
    return new Promise((resolve, reject) => {
      this._http.fetch('leaderboard', { method: 'post', body: json(submission) }).then(
        res => resolve(),
        err => reject(err));
    });
  }
}
