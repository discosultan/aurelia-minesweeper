import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {MouseButton} from '../utility/input';
import {Minesweeper, GameState} from '../game/minesweeper';
import {SquareState} from '../game/square';
import {GameStateChangedEvent, NewGameRequestedEvent} from '../events';

@inject(EventAggregator)
export class Gameboard {
  GameState = GameState; // Expose the enum to the view.
  SquareState = SquareState; // Expose the enum to the view.

  @bindable settings = null;

  constructor(eventAggregator) {
    this._eventAggregator = eventAggregator;
    this._mouseUpCallback = this._onMouseUp.bind(this);

    this._eventAggregator.subscribe(NewGameRequestedEvent, _ => this.restart());
  }

  attached() {
    window.addEventListener('mouseup', this._mouseUpCallback, false);
    this.restart();
  }

  detached() { window.removeEventListener('mouseup', this._mouseUpCallback); }

  restart() {
    if (this.settings && this.settings.isValid())
      this.minesweeper = new Minesweeper(this.settings);
  }

  onSmileyMouseDown(evt) {
    if (evt.which === MouseButton.Left)
      this.isSmileyPressed = true;
  }

  onSmileyMouseUp(evt) {
    if (evt.which === MouseButton.Left) {
      this.isSmileyPressed = false;
      this.restart();
    }
  }

  onSmileyMouseOut(evt) {
    if (evt.which === MouseButton.Left)
      this.isSmileyPressed = false;
  }

  onSquareMouseDown(square, evt) {
    if (evt.which === MouseButton.Left) {
      this.isMouseLeftDown = true;
      this.isPressValid = true;
      this.minesweeper.pressSquare(square, this._isChording());
    } else if (evt.which === MouseButton.Right) {
      this.isMouseRightDown = true;
      if (this.isMouseLeftDown) {
        this.isPressValid = true;
        this.minesweeper.pressSquare(square, this._isChording());
      }
    }
  }

  onSquareMouseUp(square, evt) {
    if (this.isMouseLeftDown && (evt.which === MouseButton.Left || evt.which === MouseButton.Right)) {
      const previousState = this.minesweeper.state;
      this.minesweeper.openSquare(square, this._isChording());
      const currentState = this.minesweeper.state;
      if (previousState !== currentState)
        this._eventAggregator.publish(new GameStateChangedEvent(this.minesweeper, previousState, currentState));
      this.isPressValid = false;
    }
  }

  onSquareMouseOver(square, evt) {
    if (this.isPressValid && (evt.which === MouseButton.Left || evt.which === MouseButton.Right))
      this.minesweeper.pressSquare(square, this._isChording());
  }

  onSquareMouseOut(square, evt) {
    this.minesweeper.releaseSquare(square, this._isChording());
  }

  onSquareContextMenu(square, evt) {
    evt.preventDefault();
    if (!this.isMouseLeftDown && evt.which && evt.which === MouseButton.Right)
      this.minesweeper.toggleSquareFlag(square);
  }

  _isChording() { return this.isMouseLeftDown && this.isMouseRightDown; }

  _onMouseUp(evt) {
    if (evt.which === MouseButton.Left) {
      this.isMouseLeftDown = false;
      this.isPressValid = false;
    } else if (evt.which === MouseButton.Right) {
      this.isMouseRightDown = false;
    }
  }
}
