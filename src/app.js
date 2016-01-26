import {inject} from 'aurelia-framework';
import {Minesweeper} from './game/minesweeper';
import {GameSettings} from './game/settings';

export class App {
  settingsOpen = false;
  settings = GameSettings.intermediate();  
}
