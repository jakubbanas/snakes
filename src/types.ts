export interface GameObject {
  type: BoardElement;
  position: Coordinate;
}

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
  GREEN = "green",
}

export type MovementMapping = {
  [key in Direction]: (c: Coordinate) => Coordinate;
};

export interface SnakeUI {
  drawSquare: (x: number, y: number, color: Color) => void;
  reset: () => void;
  setScore: (score: number) => void;
}

export type KeyEventDirectionMapping = { [key: string]: Direction };
export type ControllerAction = () => void;
export type ControllerActionMapping = {
  [key in Direction]: ControllerAction;
};

export type SnakePosition = Coordinate[];

export enum RuleResultType {
  GameOver,
  SnakeExtend,
  NoAction,
  CreateGameObject,
}

export interface RuleResult {
  type: RuleResultType;
  payload?: GameObject;
}

export type Rule = (
  snakePosition: SnakePosition,
  boardState: BoardState
) => RuleResult;

export type BoardState = BoardElement[][];

export enum BoardElement {
  snake = 1,
  apple = "a",
  empty = 0,
  poison = "p",
}
