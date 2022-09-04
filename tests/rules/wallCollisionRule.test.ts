import wallCollisionRule from "../../src/rules/wallCollisionRule";
import { RuleResultType, SnakePosition } from "../../src/types";

describe("Wall collision rule", () => {
  const testBoardState = [
    [0, 0],
    [0, 0],
  ];

  it("should collision be detected if snake cross the board on right", () => {
    const testSnakePosition: SnakePosition = [[2, 0]];

    const result = wallCollisionRule(testSnakePosition, testBoardState);

    expect(result).toStrictEqual({ type: RuleResultType.GameOver });
  });

  it("should collision be detected if snake cross the board on left", () => {
    const testSnakePosition: SnakePosition = [[-1, 0]];

    const result = wallCollisionRule(testSnakePosition, testBoardState);

    expect(result).toStrictEqual({ type: RuleResultType.GameOver });
  });

  it("should collision be detected if snake cross the board on top", () => {
    const testSnakePosition: SnakePosition = [[0, -1]];

    const result = wallCollisionRule(testSnakePosition, testBoardState);

    expect(result).toStrictEqual({ type: RuleResultType.GameOver });
  });

  it("should collision be detected if snake cross the board on bottom", () => {
    const testSnakePosition: SnakePosition = [[0, 2]];

    const result = wallCollisionRule(testSnakePosition, testBoardState);

    expect(result).toStrictEqual({ type: RuleResultType.GameOver });
  });

  it("should return no action if no wall collision detected", () => {
    const testSnakePosition: SnakePosition = [[0, 0]];

    const result = wallCollisionRule(testSnakePosition, testBoardState);

    expect(result).toStrictEqual({ type: RuleResultType.NoAction });
  });
});
