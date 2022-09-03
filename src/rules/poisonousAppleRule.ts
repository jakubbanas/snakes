import { BoardElement, BoardState } from "../core/board";
import { SnakePosition } from "../core/snake";
import { RuleResult, RuleResultType } from "./rulesManager";

const randomNumber = (max) => Math.floor(Math.random() * (max - 1));

const randomPosition = (x, y) => [randomNumber(x), randomNumber(y)];

export default (
  snakePosition: SnakePosition,
  boardState: BoardState
): RuleResult => {
  const boardHeigth = boardState.length;
  const boardWidth = boardState[0].length;

  if (!boardState.flat().includes(BoardElement.apple)) {
    const [x, y] = randomPosition(boardWidth, boardHeigth);

    return {
      type: RuleResultType.CreateGameObject,
      payload: { position: [x, y], type: BoardElement.poison },
    };
  }

  const snakeEatsApple = snakePosition.find(([x, y]) => {
    if (!boardState[x]) return;
    return boardState[x][y] === BoardElement.poison;
  });
  if (snakeEatsApple) {
    return { type: RuleResultType.GameOver };
  }

  return { type: RuleResultType.NoAction };
};
