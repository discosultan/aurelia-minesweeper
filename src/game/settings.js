export class GameSettings {
  constructor(difficulty, name, width, height, numMines) {
    this.difficulty = difficulty;
    this.name = name;
    this.width = width;
    this.height = height;
    this.numMines = numMines;
  }

  isValid() {
    // Minefield width and height must be larger than zero!
    // Number of mines must be less than ${this.width*this.height}
    return this.width >= 1 && this.height >= 1 && this.numMines < this.width*this.height;
  }

  clone() {
    return JSON.parse(JSON.stringify(this)); // TODO: extract dependency to JSON?
  }

  static beginner() {
    return new GameSettings(GameDifficulty.Beginner, 'Beginner', 9, 9, 10);
  }

  static intermediate() {
    return new GameSettings(GameDifficulty.Intermediate, 'Intermediate', 16, 16, 40);
  }

  static expert() {
    return new GameSettings(GameDifficulty.Expert, 'Expert', 30, 16, 99);
  }

  static custom() {
    return new GameSettings(GameDifficulty.Custom, 'Custom', 30, 20, 145);
  }
}

export const GameDifficulty = {
  Beginner: 1,
  Intermediate: 2,
  Expert: 4,
  Custom: 8
};
