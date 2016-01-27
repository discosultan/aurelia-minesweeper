import {bindable, inject, customElement} from 'aurelia-framework';
import {GameSettings, GameSettingsType} from '../game/settings';

export class Settings {
  @bindable settings = null;
  GameSettingsType = GameSettingsType; // Expose GameSettingsType enum to the view.

  settingsComparer = (lhv, rhv) => lhv.type === rhv.type;

  constructor() {
    this.allSettings = [
      GameSettings.beginner(),
      GameSettings.intermediate(),
      GameSettings.expert(),
      GameSettings.custom()
    ];
  }
}
