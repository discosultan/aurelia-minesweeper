export class GameStateChangedEvent {
  constructor(minesweeper, previousState, currentState) {
    this.minesweeper = minesweeper;
    this.previousState = previousState;
    this.currentState = currentState;
  }
}
