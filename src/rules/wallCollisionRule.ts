import {
  BoardState,
  RuleResult,
  RuleResultType,
  SnakePosition,
} from "../types";

export default (
  snakePosition: SnakePosition,
  boardState: BoardState
): RuleResult => {
  const boardHeight = boardState.length;
  const boardWidth = boardState[0].length;

  const collision = snakePosition.find((position) => {
    const [x, y] = position;
    return x >= boardWidth || y >= boardHeight || x < 0 || y < 0;
  });

  if (collision) {
    return { type: RuleResultType.GameOver };
  }

  return { type: RuleResultType.NoAction };
};
