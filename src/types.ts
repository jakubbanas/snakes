export type Coordinate = [number, number];

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export enum Color {
  WHITE = "white",
  BLACK = "black",
  SILVER = "silver",
  PURPLE = "purple",
  RED = "red",
}

export type MovementMaping = {
  [key in Direction]: (Coordinate) => Coordinate;
};

export interface SnakeUI {
  drawSquare: (x: number, y: number, color: Color) => void;
  reset: () => void;
  setScore: (score: number) => void;
}
