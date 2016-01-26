import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Storage} from './utility/storage';
import {GameState} from './game/minesweeper';
import {GameSettingsType} from './game/settings';
import {GameStateChangedEvent} from './events';

@inject(EventAggregator, Storage)
export class Highscores {
  _settingsTypeKeyMap = {};

  categories = ['expert', 'intermediate', 'beginner'];
  scores = {};

  constructor(eventAggregator, storage) {
    this._storage = storage;

    this._settingsTypeKeyMap[GameSettingsType.Expert] = this.categories[0];
    this._settingsTypeKeyMap[GameSettingsType.Intermediate] = this.categories[1];
    this._settingsTypeKeyMap[GameSettingsType.Beginner] = this.categories[2];

    for (let key of this.categories) {
      this.scores[key] = this._storage.get(key);
      if (!this.scores[key])
        this.scores[key] = [];
    }

    this._addDummyHighscores();

    eventAggregator.subscribe(GameStateChangedEvent, this._gameStateChanged.bind(this));
  }

  _gameStateChanged(evt) {
    if (evt.currentState === GameState.Won) {
      let key = this._settingsTypeKeyMap[evt.minesweeper.settings.type];
      if (key) {
        let catScores = this.scores[key];
        catScores.push({ name: 'Igor', time: evt.minesweeper.gameTime, countryCode: 'ee' });
        this._storage.set(key, catScores);
      }
    }
  }

  _addDummyHighscores() {
    for (let key of this.categories) {
      // let catScores = this.scores[key];
      let catScores = [];
      for (let i = 0; i < 10; i++)
        catScores.push({ name: 'Igor', time: 151, countryCode: 'ee' });
      this._storage.set(key, catScores);
      break;
    }
  }
}
