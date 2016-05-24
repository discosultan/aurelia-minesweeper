import 'isomorphic-fetch';
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class RemoteLeaderboardStorage {
  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('//jwin.cloudapp.net:3000/')
        .rejectErrorResponses();
    });

    this._http = http;
  }

  isAvailable() {
    return this._http.fetch('test');
    
    // return new Promise((resolve, reject) => {
    //   this._http.fetch('test').then(
    //     res => resolve(),
    //     err => reject(err));
    // });
  }

  get() {
    return this._http.fetch('leaderboard').then(res => res.json());
    
    // return new Promise((resolve, reject) => {
    //   this._http.fetch('leaderboard').then(
    //     res => resolve(res.json()),
    //     err => reject(err));
    // });
  }

  push(submission) {
    return this._http.fetch('leaderboard', { method: 'post', body: json(submission) });
    
    // return new Promise((resolve, reject) => {
    //   this._http.fetch('leaderboard', { method: 'post', body: json(submission) }).then(
    //     res => resolve(),
    //     err => reject(err));
    // });
  }
}
