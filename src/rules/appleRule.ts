import {
  BoardElement,
  BoardState,
  RuleResult,
  RuleResultType,
  SnakePosition,
} from "../types";
import { randomPosition } from "./utils";

export default (
  snakePosition: SnakePosition,
  boardState: BoardState
): RuleResult => {
  const boardHeight = boardState.length;
  const boardWidth = boardState[0].length;

  if (!boardState.flat().includes(BoardElement.apple)) {
    const [x, y] = randomPosition(boardWidth, boardHeight);

    return {
      type: RuleResultType.CreateGameObject,
      payload: { position: [x, y], type: BoardElement.apple },
    };
  }

  const snakeEatsApple = snakePosition.find(([x, y]) => {
    if (!boardState[x]) return;
    return boardState[x][y] === BoardElement.apple;
  });
  if (snakeEatsApple) {
    return { type: RuleResultType.SnakeExtend };
  }

  return { type: RuleResultType.NoAction };
};
