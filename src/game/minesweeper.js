import {Square, SquareState} from './square';
import {Timer} from '../utility/timer';

export class Minesweeper {
  constructor (settings) {
    if (!settings.isValid())
      throw `Minefield width and height must be larger than zero and number of mines must be less than ${settings.width*settings.height}!`;

    this._timer = new Timer(() => this.time++, 1000); // TODO: extract Timer dependency?
    this.settings = settings.clone();

    this.reset();
  }

  pressSquare(square, isChording) {
    if (this.state & GameState.GameOver) return;
    square.press();
    if (isChording)
      this._performOnAdjacentSquares(square, adjacentSquare => adjacentSquare.press());
  }

  releaseSquare(square, isChording) {
    square.release();
    if (isChording)
      this._performOnAdjacentSquares(square, adjacentSquare => adjacentSquare.release());
  }

  openSquare(square, isChording) {
    if (this.state & GameState.GameOver) return;
    if (isChording) {
      let adjacentMines = square.numAdjacentMines;
      let adjacentSquaresFlagged = 0;
      this._performOnAdjacentSquares(square, adjacentSquare => {
        if (adjacentSquare.state === SquareState.Flagged) adjacentSquaresFlagged++;
      });
      if (square.state === SquareState.Open && adjacentSquaresFlagged > 0 && adjacentMines === adjacentSquaresFlagged)
        this._performOnAdjacentSquares(square, adjacentSquare => this._openSquareInner(adjacentSquare));
      else
        this.releaseSquare(square, true);
    } else {
      this._openSquareInner(square);
    }
  }

  toggleSquareFlag(square) {
    if (this.state & GameState.GameOver) return;
    if (square.state === SquareState.Flagged)
      this._unflagSquare(square);
    else
      this._flagSquare(square);
  }

  reset() {
      this.numOpened = 0;
      this.numFlagged = 0;
      this.time = 0;
      this._initializeSquares();
      this._setState(GameState.ReadyToPlay);
      // Mines are placed when the user has opened the first square to
      // ensure that first square is always mine-free.
  }

  _initializeSquares() {
    this.squares = new Array(this.settings.height);
    for (let y = 0; y < this.settings.height; y++) {
      this.squares[y] = new Array(this.settings.width);
      for (let x = 0; x < this.settings.width; x++)
          this.squares[y][x] = new Square(x, y);
    }
  }

  _ensureGameStarted(startingSquare) {
    if (this.state === GameState.ReadyToPlay) {
      this._randomlyDistributeMines(startingSquare);
      this._setState(GameState.Playing);
      this._timer.start();
    }
  }

  _setState(newState) {
    this.state = newState;
  }

  // Mines are distributed using a very naive approach where remaining mines are
  // randomly attempted to be put on squares until all of them are in place.
  // An alternative would be using Fisher-Yates (Knuth) shuffle or
  // random traversal of the squares using a Prime Search approach.
  // Since DOM rendering of big game boards is slow and inefficient anyway, we
  // wouldn't win much in applying one of the more complex approaches.
  _randomlyDistributeMines(mineFreeSquare) {
    // Place mines and count nearby mines.
    for (let i = 0; i < this.settings.numMines; i++) {
      // Get random x and y to place the mine.
      let availableSquare;
      do {
        let random_x = Math.floor(Math.random() * this.settings.width);
        let random_y = Math.floor(Math.random() * this.settings.height);
        let square = this.squares[random_y][random_x];
        if (!square.hasMine && square !== mineFreeSquare) {
          let isAdjacentToMineFreeSquare = false;
          this._performOnAdjacentSquares(mineFreeSquare, adjacentSquare => {
            if (square === adjacentSquare)
              isAdjacentToMineFreeSquare = true;
          });
          let numSquares = this.settings.width * this.settings.height;
          if (!isAdjacentToMineFreeSquare || this.settings.numMines > numSquares - 9)
            availableSquare = square;
        }
      } while (!availableSquare);

      // Place mine to the randomly picked square indicated by a negative value.
      availableSquare.numAdjacentMines = -this.settings.numMines;

      // Increment all nearby squares of randomly picked square by one to count total number of mines in each square.
      this._performOnAdjacentSquares(availableSquare, adjacentSquare => adjacentSquare.numAdjacentMines++);
    }
  }

  _openSquareInner(square) {
    if (square.open()) {
      this._ensureGameStarted(square);
      this.numOpened++;
      if (square.hasMine) // Opened a square with a mine on it!
        this._onOpenedMinedSquare(square);
      else // Opened a safe square.
        this._onOpenedNormalSquare(square);
    }
  }

  _onOpenedMinedSquare(minedSquare) {
    minedSquare.causedGameOver = true;
    this._timer.stop();
    this._setState(GameState.Lost);
    this._performOnAllSquares(square => {
      if (square.hasMine) {
        square.press();
        square.open();
      }
    });
  }

  _onOpenedNormalSquare(normalSquare) {
    if (this.numOpened === this.settings.width*this.settings.height - this.settings.numMines) { // Matches win condition.
      this._timer.stop();
      this._setState(GameState.Won);
      this._performOnAllSquares(square => { if (square.hasMine) this._flagSquare(square); });
    }
    if (normalSquare.numAdjacentMines === 0) // Square has no adjacent mines.
      this._performOnAdjacentSquares(normalSquare, adjacentSquare => {
        this.pressSquare(adjacentSquare);
        this.openSquare(adjacentSquare);
      });
  }

  _flagSquare(square) {
    if (square.flag())
      this.numFlagged++;
  }

  _unflagSquare(square) {
    if (square.unflag())
      this.numFlagged--;
  }

  _performOnAllSquares(action) {
    for (let y = 0; y < this.settings.height; y++)
      for (let x = 0; x < this.settings.width; x++)
        action(this.squares[y][x]);
  }

  _performOnAdjacentSquares(square, action) {
    for (let y = square.y - 1; y <= square.y + 1; y++) {
      for (let x = square.x - 1; x <= square.x + 1; x++)
        if (x >= 0 && y >= 0 && x < this.settings.width && y < this.settings.height && (x !== square.x || y !== square.y))
          action(this.squares[y][x]);
    }
  }
}

export const GameState = {
  ReadyToPlay: 1,
  Playing: 2,
  Won: 4,
  Lost: 8,
  GameOver: 12
};
