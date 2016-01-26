import {Square, SquareState} from './square';
import {Timer} from '../utility/timer';

export class Minesweeper {
  constructor (settings) {
    this._timer = new Timer(() => this.gameTime++, 1000); // TODO: extract dependency?
    this.settings = settings.clone();

    if (this.settings.width < 1 || this.settings.height < 1)
      throw `Minefield width and height must be larger than zero!`;
    if (this.settings.numMines >= this.settings.width*this.settings.height)
      throw `Number of mines must be less than ${this.width*this.height}!`;

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
      this._performOnAdjacentSquares(square, adjacentSquare => { if (adjacentSquare.state === SquareState.Flagged) adjacentSquaresFlagged++; });
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
      this.gameTime = 0;
      this._initializeSquares();
      this._setState(GameState.ReadyToPlay);
      // Mines are placed when the user has opened the first square to ensure that first square is always mine-free.
  }

  _initializeSquares() {
    this.squares = [];
    for (let y = 0; y < this.settings.height; y++) {
      this.squares.push([]);
      for (let x = 0; x < this.settings.width; x++)
          this.squares[y].push(new Square(x, y));
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

  _randomlyDistributeMines(mineFreeSquare) {
    // Place mines and count nearby mines.
    for (let i = 0; i < this.settings.numMines; i++) {
      // Get random x and y to place the mine.
      let availableSquare;
      do {
        let random_x = Math.floor(Math.random() * this.settings.width);
        let random_y = Math.floor(Math.random() * this.settings.height);
        let square = this.squares[random_y][random_x];
        if (square.numAdjacentMines >= 0 && square !== mineFreeSquare)
          availableSquare = square;
      } while (!availableSquare);

      // Place mine to the randomly picked square indicated by a negative value.
      availableSquare.numAdjacentMines = -this.settings.numMines;

      // Increment all nearby squares of randomly picked square by one to count total number of mines in each square.
      this._performOnAdjacentSquares(availableSquare, adjacentSquare => { adjacentSquare.numAdjacentMines++; });
    }
  }

  _openSquareInner(square) {
    if (square.open()) {
      this._ensureGameStarted(square);
      this.numOpened++;
      if (square.numAdjacentMines < 0) // Opened a square with a mine on it!
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
      if (square.numAdjacentMines < 0) {
        square.press();
        square.open();
      }
    });
  }

  _onOpenedNormalSquare(normalSquare) {
    if (this.numOpened === this.settings.width*this.settings.height - this.settings.numMines) { // Matches win condition.
      this._timer.stop();
      this._setState(GameState.Won);
      this._performOnAllSquares(square => { if (square.numAdjacentMines < 0) this._flagSquare(square); });
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
    for (let offset_y = square.y - 1; offset_y <= square.y + 1; offset_y++)
      for (let offset_x = square.x - 1; offset_x <= square.x + 1; offset_x++)
        if (offset_x >= 0 && offset_y >= 0 && offset_x < this.settings.width && offset_y < this.settings.height && (offset_x !== square.x || offset_y !== square.y))
          action(this.squares[offset_y][offset_x]);
  }
}

export const GameState = {
  ReadyToPlay: 1,
  Playing: 2,
  Won: 4,
  Lost: 8,
  GameOver: 12
};
