import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {GameSettings, GameSettingsType} from '../game/settings';
import {NewGameRequestedEvent} from '../events';

@inject(EventAggregator)
export class Settings {
  GameSettingsType = GameSettingsType; // Expose GameSettingsType enum to the view.

  @bindable settings = null;
  allSettings = [
    GameSettings.beginner(),
    GameSettings.intermediate(),
    GameSettings.expert(),
    GameSettings.custom()
  ];

  settingsComparer = (lhv, rhv) => lhv.type === rhv.type;

  constructor(eventAggregator) {
    this._eventAggregator = eventAggregator;
  }

  newGame() {
    this._eventAggregator.publish(new NewGameRequestedEvent());
  }
}
