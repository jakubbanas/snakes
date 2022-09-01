import { BoardState } from "../core/board";
import { SnakePosition } from "../core/snake";
import { RuleResult } from "./rulesManager";

export default (snakePosition: SnakePosition, boardState: BoardState) => {
  const boardHeigth = boardState.length;
  const boardWidth = boardState[0].length;

  const colision = snakePosition.find((position) => {
    const [x, y] = position;
    return x >= boardWidth || y >= boardHeigth || x < 0 || y < 0;
  });

  if (colision) {
    return RuleResult.GameOver;
  }

  return RuleResult.NoAction;
};
