import {bindable} from 'aurelia-framework';
import {GameSettings, GameSettingsType} from '../game/settings';

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
}
