import rulesManager from "../../src/rules/rulesManager";
import { Rule, RuleResultType, SnakePosition } from "../../src/types";

describe("RulesManager", () => {
  const testSnakePosition: SnakePosition = [[0, 0]];
  const testBoardState = [[]];

  it("should return no result if there are only NoAction results", () => {
    const testRule: Rule = () => ({
      type: RuleResultType.NoAction,
    });

    const result = rulesManager.checkRules(testSnakePosition, testBoardState, [
      testRule,
    ]);

    expect(result).toStrictEqual([]);
  });

  it("should return results", () => {
    const testRules: Rule[] = [
      () => ({ type: RuleResultType.NoAction }),
      () => ({ type: RuleResultType.GameOver }),
      () => ({ type: RuleResultType.SnakeExtend }),
    ];

    const result = rulesManager.checkRules(
      testSnakePosition,
      testBoardState,
      testRules
    );

    expect(result).toStrictEqual([
      { type: RuleResultType.GameOver },
      { type: RuleResultType.SnakeExtend },
    ]);
  });
});
