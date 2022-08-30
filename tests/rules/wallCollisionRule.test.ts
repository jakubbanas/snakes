import { SnakePosition } from "../../src/core/snake";
import { RuleResult } from "../../src/rules/rulesManager";
import wallCollisionRule from "../../src/rules/wallCollisionRule";

describe("Wall collision rule", () => {
  const testBoardState = [
    [0, 0],
    [0, 0],
  ];

  it("should colision be detected if snake cross the board on right", () => {
    const testSnakePosition: SnakePosition = [[3, 0]];

    const result = wallCollisionRule(testSnakePosition, testBoardState);

    expect(result).toBe(RuleResult.GameOver);
  });

  it("should colision be detected if snake cross the board on left", () => {
    const testSnakePosition: SnakePosition = [[-1, 0]];

    const result = wallCollisionRule(testSnakePosition, testBoardState);

    expect(result).toBe(RuleResult.GameOver);
  });

  it("should colision be detected if snake cross the board on top", () => {
    const testSnakePosition: SnakePosition = [[0, -1]];

    const result = wallCollisionRule(testSnakePosition, testBoardState);

    expect(result).toBe(RuleResult.GameOver);
  });

  it("should colision be detected if snake cross the board on bottom", () => {
    const testSnakePosition: SnakePosition = [[0, 3]];

    const result = wallCollisionRule(testSnakePosition, testBoardState);

    expect(result).toBe(RuleResult.GameOver);
  });

  it("should return no action if no wall colision detected", () => {
    const testSnakePosition: SnakePosition = [[0, 0]];

    const result = wallCollisionRule(testSnakePosition, testBoardState);

    expect(result).toBe(RuleResult.NoAction);
  });
});
