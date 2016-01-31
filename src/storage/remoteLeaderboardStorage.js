import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class RemoteLeaderboardStorage {
  constructor(http) {
    http.configure(config => {
      config.withBaseUrl('//localhost:3000/');
    });

    this._http = http;
  }

  isAvailable() {
    // return new Promise((resolve, reject) => {
      return this._http.fetch('leaderboard', 'jsonp').then(() => resolve(), () => reject());
    // });
  }

  get() {
    return new Promise((resolve, reject) => {

    });
  }

  push(submission) {
    return new Promise((resolve, reject) => {

    });
  }
}
