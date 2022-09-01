import { BoardElement, BoardState } from "../core/board";
import { SnakePosition } from "../core/snake";
import { RuleResult, RuleResultType } from "./rulesManager";

const randomNumber = (max) => Math.floor(Math.random() * (max - 1));

const randomPosition = (x, y) => [randomNumber(x), randomNumber(y)];

export default (_: SnakePosition, boardState: BoardState): RuleResult => {
  const boardHeigth = boardState.length;
  const boardWidth = boardState[0].length;

  if (!boardState.flat().includes(BoardElement.apple)) {
    const [x, y] = randomPosition(boardWidth, boardHeigth);

    return {
      type: RuleResultType.CreateGameObject,
      payload: { position: [x, y], type: BoardElement.apple },
    };
  }

  return { type: RuleResultType.NoAction };
};
