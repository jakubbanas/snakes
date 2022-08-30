import { Color, Coordinate, Direction, MovementMaping } from "../types";

export type SnakePosition = Coordinate[];

const movementMaping: MovementMaping = {
  [Direction.DOWN]: ([x, y]) => [x, y + 1],
  [Direction.UP]: ([x, y]) => [x, y - 1],
  [Direction.LEFT]: ([x, y]) => [x - 1, y],
  [Direction.RIGHT]: ([x, y]) => [x + 1, y],
};

class Snake {
  private movingDirection: Direction = Direction.RIGHT;
  private color: Color;
  private name: string;
  private position: SnakePosition;
  private isEating = false;

  public getColor(): Color {
    return this.color;
  }

  public getName(): string {
    return this.name;
  }

  public getPosition(): SnakePosition {
    return this.position;
  }

  public setMovingDirection(direction: Direction) {
    this.movingDirection = direction;
  }

  public setPosition(position: SnakePosition) {
    this.position = position;
  }

  public feed() {
    this.isEating = true;
  }

  public reset() {
    this.position = [[0, 0]];
    this.movingDirection = Direction.RIGHT;
  }

  constructor(
    name: string,
    color: Color = Color.PURPLE,
    position: SnakePosition = [[0, 0]]
  ) {
    this.name = name;
    this.color = color;
    this.position = position;
  }

  public move(): void {
    const headPosition = this.position[this.position.length - 1];
    if (!this.isEating) {
      this.position.shift();
    }
    this.isEating = false;
    this.position.push(movementMaping[this.movingDirection](headPosition));
  }
}

export default Snake;
