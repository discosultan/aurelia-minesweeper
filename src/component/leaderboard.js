import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RemoteHighscoreStorage} from '../storage/remoteHighscoreStorage';
import {LocalHighscoreStorage} from '../storage/localHighscoreStorage';
import {GameState} from '../game/minesweeper';
import {GameSettings, GameSettingsType} from '../game/settings';
import {GameStateChangedEvent} from '../events';

// TODO: determine storage availability at DI container setup stage.
@inject(EventAggregator, RemoteHighscoreStorage, LocalHighscoreStorage)
export class Leaderboard {
  categories = [ GameSettings.expert(), GameSettings.intermediate(), GameSettings.beginner() ];
  scores = {};
  activeSubmission = null;

  constructor(eventAggregator, remoteHighscoreStorage, localHighscoreStorage) {
    for (let category of this.categories)
        this.scores[category.type] = [];

    remoteHighscoreStorage.isAvailable().then(
      () => {
        console.log("REMOTE AVAILABLE");
        this._storage = remoteHighscoreStorage;
        this.getScores();
      },
      () => {
        console.log("REMOTE NOT AVAILABLE");
        console.log("FALLBACK TO LOCAL");
        console.log(localHighscoreStorage);
        this._storage = localHighscoreStorage;
        this.isUsingLocalStorage = true;
        this.getScores();
      });

    // TEMP
    // this._addDummyHighscores();
    this.activeSubmission = { time: 15, settings: GameSettings.beginner(), isHighscore: true };

    eventAggregator.subscribe(GameStateChangedEvent, this._gameStateChanged.bind(this));

    this._initializeTwitterWidgets();
  }

  getScores() {
    this._storage.get().then(highscores => {
      if (highscores)
        this.scores = highscores;
    });
  }

  submit(submission) {
    if (submission.name && !submission.name.match(/^\s+$/)) {
      console.log("SUBMIT");
      console.log(submission);
      // this._storage.add(submission).then(() => {
      //   this.getScores();
      //   this.activeSubmission = null;
      // });
    } else {
      submission.isInvalid = true;
    }
  }

  _gameStateChanged(evt) {
    if (evt.currentState === GameState.Won) {
      let submission = {
        time: evt.minesweeper.gameTime,
        settings: evt.minesweeper.settings,
      };
      submission.isHighscore = this._isHighscoreSubmission(submission);
    }
  }

  _isHighscoreSubmission(submission) {
    return true;
  }

  _addDummyHighscores() {
    for (let key of this.categories) {
      let catScores = [];
      for (let i = 0; i < 10; i++)
        catScores.push({ name: 'Igor', time: 151, countryCode: 'ee' });
      this._storage.set(key, catScores);
      break;
    }
  }

  _initializeTwitterWidgets() {
    let doc = document;
    let js = doc.createElement('script');
    js.src = 'https://platform.twitter.com/widgets.js';
    doc.body.appendChild(js);
  }
}
