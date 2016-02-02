import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Key} from '../utility/input';
import {RemoteLeaderboardStorage} from '../storage/remoteLeaderboardStorage';
import {LocalLeaderboardStorage} from '../storage/localLeaderboardStorage';
import {GameState} from '../game/minesweeper';
import {GameSettings, GameDifficulty} from '../game/settings';
import {GameStateChangedEvent} from '../events';

// TODO: determine storage availability at DI container setup stage?
@inject(EventAggregator, RemoteLeaderboardStorage, LocalLeaderboardStorage)
export class Leaderboard {
  categories = [ GameSettings.expert(), GameSettings.intermediate(), GameSettings.beginner() ];
  categoriesMap = {};
  leaderboard = { all: {} };
  activeSubmission = null;

  constructor(eventAggregator, remoteLeaderboardStorage, localLeaderboardStorage) {
    for (let category of this.categories) {
      this.leaderboard.all[category.difficulty] = [];
      this.categoriesMap[category.difficulty] = category;
    }

    // Check if remote storage is available.
    remoteLeaderboardStorage.isAvailable().then(
      () => {
        this._storage = remoteLeaderboardStorage;
        this.getScores();
      },
      () => {
        // Fallback to local storage.
        this._storage = localLeaderboardStorage;
        this.isUsingLocalStorage = true;
        this.getScores();
      });

    eventAggregator.subscribe(GameStateChangedEvent, this._gameStateChanged.bind(this));
  }

  get submissionText() {
    if (this.activeSubmission)
      return `I just beat #aurelia-minesweeper in ${this.activeSubmission.time} seconds on ${this.categoriesMap[this.activeSubmission.difficulty].name} mode!`;
  }

  getScores() {
    this._storage.get().then(leaderboard => {
      if (leaderboard)
        for (var key in leaderboard.all)
          this.leaderboard.all[key] = leaderboard.all[key];
    });
  }

  submit(submission) {
    if (submission.name && !submission.name.match(/^\s+$/)) {
      submission.isSubmitted = true;
      this._storage.push(submission).then(() => {
        this.getScores();
      });
    } else {
      submission.isInvalid = true;
    }
  }

  onSubmissionKeydown(submission, evt) {
    if (evt.which === Key.Enter)
      this.submit(submission);
    else if (evt.which === Key.Escape)
      this.closeSubmission();
    return true;
  }

  closeSubmission() {
    this.activeSubmission = null;
  }

  _gameStateChanged(evt) {
    if (evt.currentState === GameState.Won) {
      this.activeSubmission = {
        time: evt.minesweeper.time,
        difficulty: evt.minesweeper.settings.difficulty
      };
      this.activeSubmission.isHighscore = this._isHighscoreSubmission(this.activeSubmission);
    }
  }

  _isHighscoreSubmission(submission) {
    return submission.difficulty !== GameDifficulty.Custom;
  }
}
