export class GameSettings {
  constructor(type, name, width, height, numMines) {
    this.type = type;
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
    return new GameSettings(GameSettingsType.Beginner, 'Beginner', 9, 9, 10);
  }

  static intermediate() {
    return new GameSettings(GameSettingsType.Intermediate, 'Intermediate', 16, 16, 40);
  }

  static expert() {
    return new GameSettings(GameSettingsType.Expert, 'Expert', 30, 16, 99);
  }

  static custom() {
    return new GameSettings(GameSettingsType.Custom, 'Custom', 30, 20, 145);
  }
}

export const GameSettingsType = {
  Beginner: 1,
  Intermediate: 2,
  Expert: 4,
  Custom: 8
};
