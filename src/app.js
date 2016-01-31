import {GameSettings} from './game/settings';
import {Key} from './utility/input';

export class App {
  settingsOpen = false;
  settings = GameSettings.beginner();

  onSettingsKeydown(evt) {
    if (evt.which === Key.Escape)
      this.settingsOpen = false;
    return true;
  }
}
