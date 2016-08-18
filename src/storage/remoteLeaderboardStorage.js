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
  }

  get() {
    return this._http.fetch('leaderboard').then(res => res.json());
  }

  push(submission) {
    return this._http.fetch('leaderboard', { method: 'post', body: json(submission) });
  }
}
