import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RemoteLeaderboardStorage} from '../storage/remoteLeaderboardStorage';
import {LocalLeaderboardStorage} from '../storage/localLeaderboardStorage';
import {GameState} from '../game/minesweeper';
import {GameSettings, GameSettingsType} from '../game/settings';
import {GameStateChangedEvent} from '../events';

// TODO: determine storage availability at DI container setup stage.
@inject(EventAggregator, RemoteLeaderboardStorage, LocalLeaderboardStorage)
export class Leaderboard {
  categories = [ GameSettings.expert(), GameSettings.intermediate(), GameSettings.beginner() ];
  leaderboard = {};
  activeSubmission = null;

  constructor(eventAggregator, remoteLeaderboardStorage, localLeaderboardStorage) {
    for (let category of this.categories)
        this.leaderboard[category.type] = [];

    remoteLeaderboardStorage.isAvailable().then(
      () => {
        this._storage = remoteLeaderboardStorage;
        this.getScores();
      },
      () => {
        this._storage = localLeaderboardStorage;
        this.isUsingLocalStorage = true;
        this.getScores();
      });

    eventAggregator.subscribe(GameStateChangedEvent, this._gameStateChanged.bind(this));
  }

  get submissionText() {
    if (this.activeSubmission)
      return `I just beat #aurelia-minesweeper in ${this.activeSubmission.time} seconds on ${this.activeSubmission.settings.name} mode!`;
  }

  getScores() {
    this._storage.get().then(leaderboard => {
      if (leaderboard)
        for (var key in leaderboard)
          this.leaderboard[key] = leaderboard[key];
    });
  }

  submit(submission) {
    if (submission.name && !submission.name.match(/^\s+$/)) {
      this._storage.push(submission).then(() => {
        submission.isSubmitted = true;
        this.getScores();
      });
    } else {
      submission.isInvalid = true;
    }
  }

  onSubmissionKeypress(submission, evt) {
    if (evt.which === 13)
      this.submit(submission);
    return true;
  }

  closeSubmission() {
    this.activeSubmission = null;
  }

  _gameStateChanged(evt) {
    if (evt.currentState === GameState.Won) {
      this.activeSubmission = {
        time: evt.minesweeper.gameTime,
        settings: evt.minesweeper.settings,
        country: 'ee' // TODO: TEMP
      };
      this.activeSubmission.isHighscore = this._isHighscoreSubmission(this.activeSubmission);
    }
  }

  _isHighscoreSubmission(submission) {
    return submission.settings.type !== GameSettingsType.Custom;
  }
}
