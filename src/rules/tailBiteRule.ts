import {
  BoardState,
  RuleResult,
  RuleResultType,
  SnakePosition,
} from "../types";

export default (snakePosition: SnakePosition, _: BoardState): RuleResult => {
  const snakeSegments = snakePosition.map(([x, y]) => `${x}${y}`);
  const tailBite = new Set(snakeSegments).size !== snakeSegments.length;

  if (tailBite) {
    return { type: RuleResultType.GameOver };
  }

  return { type: RuleResultType.NoAction };
};
