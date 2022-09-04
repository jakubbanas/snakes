import {
  BoardState,
  Rule,
  RuleResult,
  RuleResultType,
  SnakePosition,
} from "../types";

const checkRules = (
  snakePosition: SnakePosition,
  boardState: BoardState,
  rules: Rule[]
): RuleResult[] =>
  rules
    .map((rule) => rule(snakePosition, boardState))
    .filter((result) => result.type !== RuleResultType.NoAction);

export default { checkRules };
