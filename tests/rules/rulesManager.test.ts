import { SnakePosition } from "../../src/core/snake";
import RulesManager, {
  Rule,
  RuleResultType,
} from "../../src/rules/rulesManager";

describe("RulesManager", () => {
  const testSnakePosition: SnakePosition = [[0, 0]];
  const testBoardState = [[]];

  it("should return no result if there are only NoAction results", () => {
    const testRule: Rule = () => ({
      type: RuleResultType.NoAction,
    });

    const result = RulesManager.checkRules(testSnakePosition, testBoardState, [
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

    const result = RulesManager.checkRules(
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
