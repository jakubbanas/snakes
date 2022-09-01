import { SnakePosition } from "../../src/core/snake";
import { RuleResultType } from "../../src/rules/rulesManager";
import tailBiteRule from "../../src/rules/tailBiteRule";

describe("TailBiteRule", () => {
  it("should return game over when snake bit its tail", () => {
    const testSnakePosition: SnakePosition = [
      [0, 0],
      [0, 0],
    ];

    const result = tailBiteRule(testSnakePosition, {} as any);

    expect(result).toStrictEqual({ type: RuleResultType.GameOver });
  });

  it("should do nothing", () => {
    const testSnakePosition: SnakePosition = [[0, 0]];

    const result = tailBiteRule(testSnakePosition, {} as any);

    expect(result).toStrictEqual({ type: RuleResultType.NoAction });
  });
});
