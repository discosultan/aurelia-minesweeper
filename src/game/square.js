export class Square {
  state = SquareState.Closed;
  causedGameOver = false;
  numAdjacentMines = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get hasMine() { return this.numAdjacentMines < 0; }

  // Any state mutation should happen through the methods below.

  press() {
    if (this.state === SquareState.Closed)
      return this.state = SquareState.Pressed;
  }

  release() {
    if (this.state === SquareState.Pressed)
      return this.state = SquareState.Closed;
  }

  open() {
    if (this.state === SquareState.Pressed)
      return this.state = SquareState.Open;
  }

  flag() {
    if (this.state === SquareState.Closed)
      return this.state = SquareState.Flagged;
  }

  unflag() {
    if (this.state === SquareState.Flagged)
      return this.state = SquareState.Closed;
  }
}

export const SquareState = {
  Closed: 1,
  Pressed: 2,
  Flagged: 4,
  Open: 8
};
