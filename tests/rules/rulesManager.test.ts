import { SnakePosition } from "../../src/core/snake";
import RulesManager, { Rule, RuleResult } from "../../src/rules/rulesManager";

describe("RulesManager", () => {
  const testSnakePosition: SnakePosition = [[0, 0]];
  const testBoardState = [[]];

  it("should return no result if there are only NoAction results", () => {
    const testRule: Rule = () => RuleResult.NoAction;

    const result = RulesManager.checkRules(testSnakePosition, testBoardState, [
      testRule,
    ]);

    expect(result).toStrictEqual([]);
  });

  it("should return results", () => {
    const testRules: Rule[] = [
      () => RuleResult.NoAction,
      () => RuleResult.GameOver,
      () => RuleResult.SnakeExtend,
    ];

    const result = RulesManager.checkRules(
      testSnakePosition,
      testBoardState,
      testRules
    );

    expect(result).toStrictEqual([RuleResult.GameOver, RuleResult.SnakeExtend]);
  });
});
