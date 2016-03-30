import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {GameSettings} from './game/settings';
import {Key} from './utility/input';
import {NewGameRequestedEvent} from './events';

@inject(EventAggregator)
export class App {
  settingsOpen = false;
  settings = GameSettings.intermediate();

  constructor(eventAggregator) {
    eventAggregator.subscribe(NewGameRequestedEvent, evt => {
      if (evt.settings.isValid())
        this.settingsOpen = false;
    });
  }

  onSettingsKeydown(evt) {
    if (evt.which === Key.Escape)
      this.settingsOpen = false;
    return true;
  }
}
