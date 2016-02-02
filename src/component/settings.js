import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {GameSettings, GameDifficulty} from '../game/settings';
import {NewGameRequestedEvent} from '../events';

@inject(EventAggregator)
export class Settings {
  GameDifficulty = GameDifficulty; // Expose the enum to the view.

  @bindable settings = null;
  allSettings = [
    GameSettings.beginner(),
    GameSettings.intermediate(),
    GameSettings.expert(),
    GameSettings.custom()
  ];

  settingsComparer = (lhv, rhv) => lhv.difficulty === rhv.difficulty;

  constructor(eventAggregator) {
    this._eventAggregator = eventAggregator;
  }

  newGame() {
    this._eventAggregator.publish(new NewGameRequestedEvent(this.settings));
  }
}
