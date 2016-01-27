import {bindable, inject, customElement} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Minesweeper, GameState} from '../game/minesweeper';
import {SquareState} from '../game/square';
import {GameStateChangedEvent} from '../events';

@inject(EventAggregator)
@customElement('minesweeper')
export class MinesweeperElement {
  GameState = GameState; // Expose GameState enum to the view.
  SquareState = SquareState; // Expose SquareState enum to the view.

  @bindable settings = null;

  constructor(eventAggregator) {
    this._eventAggregator = eventAggregator;
    this._mouseUpCallback = this._onMouseUp.bind(this);
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
      let previousState = this.minesweeper.state;
      this.minesweeper.openSquare(square, this._isChording());
      let currentState = this.minesweeper.state;
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

const MouseButton = {
  Left: 1,
  Right: 3
};
