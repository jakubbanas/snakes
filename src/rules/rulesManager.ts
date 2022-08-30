import { BoardState } from "../core/board";
import { SnakePosition } from "../core/snake";

export enum RuleResult {
  GameOver,
  SnakeExtend,
  NoAction,
}

export type Rule = (
  snakePosition: SnakePosition,
  boardState: BoardState
) => RuleResult;

const checkRules = (
  snakePosition: SnakePosition,
  boardState: BoardState,
  rules: Rule[]
): RuleResult[] =>
  rules
    .map((rule) => rule(snakePosition, boardState))
    .filter((result) => result !== RuleResult.NoAction);

export default { checkRules };
