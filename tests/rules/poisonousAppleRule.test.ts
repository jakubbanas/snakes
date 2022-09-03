import { BoardElement } from "../../src/core/board";
import { SnakePosition } from "../../src/core/snake";
import poisonousAppleRule from "../../src/rules/poisonousAppleRule";
import { RuleResultType } from "../../src/rules/rulesManager";

describe("Poisonous apple collision rule", () => {
  const mathRandomSpy = jest.spyOn(Math, "random");
  mathRandomSpy.mockImplementation(() => 1);

  it("should create a new apple when there is none", () => {
    const testSnakePosition: SnakePosition = [[0, 0]];
    const testBoardState = [
      [0, 0],
      [0, 0],
    ];

    const result = poisonousAppleRule(testSnakePosition, testBoardState);

    expect(result).toStrictEqual({
      type: RuleResultType.CreateGameObject,
      payload: { position: [1, 1], type: BoardElement.poison },
    });
  });

  it("should do nothing when the regular apple is already there", () => {
    const testSnakePosition: SnakePosition = [[0, 0]];
    const testBoardState = [
      [0, BoardElement.poison],
      [0, BoardElement.apple],
    ];

    const result = poisonousAppleRule(testSnakePosition, testBoardState);

    expect(result).toStrictEqual({
      type: RuleResultType.NoAction,
    });
  });

  it("should kill snake when it overlap with an apple", () => {
    const testSnakePosition: SnakePosition = [[1, 1]];
    const testBoardState = [
      [0, BoardElement.apple],
      [0, BoardElement.poison],
    ];

    const result = poisonousAppleRule(testSnakePosition, testBoardState);

    expect(result).toStrictEqual({
      type: RuleResultType.GameOver,
    });
  });

  it("should do nothing when snake is outside the board", () => {
    const testSnakePosition: SnakePosition = [[5, 5]];
    const testBoardState = [
      [0, BoardElement.poison],
      [0, BoardElement.apple],
    ];

    const result = poisonousAppleRule(testSnakePosition, testBoardState);

    expect(result).toStrictEqual({
      type: RuleResultType.NoAction,
    });
  });
});
