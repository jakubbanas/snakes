import { BoardState } from "../core/board";
import { GameObject } from "../core/game";
import { SnakePosition } from "../core/snake";

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

const checkRules = (
  snakePosition: SnakePosition,
  boardState: BoardState,
  rules: Rule[]
): RuleResult[] =>
  rules
    .map((rule) => rule(snakePosition, boardState))
    .filter((result) => result.type !== RuleResultType.NoAction);

export default { checkRules };
