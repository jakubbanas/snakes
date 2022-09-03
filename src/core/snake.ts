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
  private name: string;
  private position: SnakePosition;
  private isEating = false;

  public getName(): string {
    return this.name;
  }

  public getPosition(): SnakePosition {
    return this.position;
  }

  public setMovingDirection(direction: Direction): void {
    const [x, y] = this.getNextStep(direction);

    const snakeSegments = this.position.map(([x, y]) => `${x}${y}`);
    const tailBite = snakeSegments.includes(`${x}${y}`);

    if (tailBite) {
      return;
    }
    this.movingDirection = direction;
  }

  private getNextStep(direction: Direction): Coordinate {
    const headPosition = this.position[this.position.length - 1];
    return movementMaping[direction](headPosition);
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

  constructor(name: string, position: SnakePosition = [[0, 0]]) {
    this.name = name;
    this.position = position;
  }

  public move(): void {
    const nextStep = this.getNextStep(this.movingDirection);
    if (!this.isEating) {
      this.position.shift();
    }
    this.isEating = false;
    this.position.push(nextStep);
  }
}

export default Snake;
