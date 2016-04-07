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

  _ongoingTouchSet = {};
  _doubleTapTimeToChord = 200; // Milliseconds.
  _holdTimeToFlag = 400;

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
      this.minesweeper.pressSquare(square, this._isChording());
      this.isPressValid = false;
    } else if (evt.which === MouseButton.Right) {
      this.isMouseRightDown = true;
      if (this.isMouseLeftDown) {
        this.minesweeper.pressSquare(square, this._isChording());
        this.isPressValid = false;
      }
    }
  }

  onSquareMouseUp(square, evt) {
    if (this.isMouseLeftDown && (evt.which === MouseButton.Left || evt.which === MouseButton.Right)) {
      this._openSquare(square, this._isChording());
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

  onSquareTouchStart(square, evt) {
    evt.preventDefault();
    let touches = evt.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      let touch = touches[i];
      this._ongoingTouchSet[touch.identifier] = true;
      (identifier =>
        window.setTimeout(() => {
          this.minesweeper.toggleSquareFlag(square);
          delete this._ongoingTouchSet[identifier];
        }, this._holdTimeToFlag)
      )(touch.identifier);
    }
  }

  onSquareTouchEnd(square, evt) {
    evt.preventDefault();
    let touches = evt.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      let touch = touches[i];
      if (this._ongoingTouchSet[touch.identifier]) {
        if (this._doubleTapActive) { // Chord on double tap.
          this.minesweeper.pressSquare(square, true);
          this._openSquare(square, true);
          this._doubleTapActive = false;
        } else {
          this._doubleTapActive = true;
          window.setTimeout(() => this._doubleTapActive = false, this._doubleTapTimeToChord);
        }
        this.minesweeper.pressSquare(square, false);
        this._openSquare(square, false);
        delete this._ongoingTouchSet[touch.identifier];
      }
    }
  }

  onSquareTouchCancel(square, evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;
    for (let i = 0; i < touches.length; i++)
      delete this._ongoingTouchSet[touches[i].identifier];
  }

  _openSquare(square, chord) {
    let previousState = this.minesweeper.state;
    this.minesweeper.openSquare(square, chord);
    let currentState = this.minesweeper.state;
    if (previousState !== currentState)
      this._eventAggregator.publish(new GameStateChangedEvent(this.minesweeper, previousState, currentState));
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
