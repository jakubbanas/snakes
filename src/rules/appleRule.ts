import { BoardState } from "../core/board";
import { SnakePosition } from "../core/snake";
import { RuleResult } from "./rulesManager";

const randomNumber = (max) => Math.floor(Math.random() * (max + 1));

const randomPosition = (x, y) => [randomNumber(x), randomNumber(y)];

export default (_: SnakePosition, boardState: BoardState) => {
  const boardHeigth = boardState.length;
  const boardWidth = boardState[0].length;

  const [x, y] = randomPosition(boardWidth, boardHeigth);

  return RuleResult.CreateElement;
};
