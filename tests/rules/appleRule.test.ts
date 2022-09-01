import { BoardElement } from "../../src/core/board";
import { SnakePosition } from "../../src/core/snake";
import appleRule from "../../src/rules/appleRule";
import { RuleResultType } from "../../src/rules/rulesManager";

describe("Wall collision rule", () => {
  const mathRandomSpy = jest.spyOn(Math, "random");
  mathRandomSpy.mockImplementation(() => 1);

  it("should create a new apple when there is none", () => {
    const testSnakePosition: SnakePosition = [[0, 0]];
    const testBoardState = [
      [0, 0],
      [0, 0],
    ];

    const result = appleRule(testSnakePosition, testBoardState);

    expect(result).toStrictEqual({
      type: RuleResultType.CreateGameObject,
      payload: { position: [1, 1], type: BoardElement.apple },
    });
  });

  it("should do nothing when the apple is already there", () => {
    const testSnakePosition: SnakePosition = [[0, 0]];
    const testBoardState = [
      [0, 0],
      [0, BoardElement.apple],
    ];

    const result = appleRule(testSnakePosition, testBoardState);

    expect(result).toStrictEqual({
      type: RuleResultType.NoAction,
    });
  });

  it("should extend snake when it overlap with an apple", () => {
    const testSnakePosition: SnakePosition = [[1, 1]];
    const testBoardState = [
      [0, 0],
      [0, BoardElement.apple],
    ];

    const result = appleRule(testSnakePosition, testBoardState);

    expect(result).toStrictEqual({
      type: RuleResultType.SnakeExtend,
    });
  });

  it("should do nothing when snake is outside the board", () => {
    const testSnakePosition: SnakePosition = [[5, 5]];
    const testBoardState = [
      [0, 0],
      [0, BoardElement.apple],
    ];

    const result = appleRule(testSnakePosition, testBoardState);

    expect(result).toStrictEqual({
      type: RuleResultType.NoAction,
    });
  });
});
