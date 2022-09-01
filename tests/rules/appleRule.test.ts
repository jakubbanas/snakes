import { BoardElement } from "../../src/core/board";
import { SnakePosition } from "../../src/core/snake";
import appleRule from "../../src/rules/appleRule";
import { RuleResultType } from "../../src/rules/rulesManager";
import wallCollisionRule from "../../src/rules/wallCollisionRule";

describe("Wall collision rule", () => {
  const mathRandomSpy = jest.spyOn(Math, "random");
  mathRandomSpy.mockImplementation(() => 1);
  it("should colision be detected if snake cross the board on right", () => {
    const testSnakePosition: SnakePosition = [[2, 0]];
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
  it("should colision be detected if snake cross the board on right", () => {
    const testSnakePosition: SnakePosition = [[2, 0]];
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
