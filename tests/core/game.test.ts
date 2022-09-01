import Game from "../../src/core/game";
import { RuleResultType } from "../../src/rules/rulesManager";

describe("Snake movement", () => {
  const snakeMock = {
    reset: jest.fn(),
    move: jest.fn(),
    getPosition: () => [[0, 0]],
  } as any;
  const uiMock = { reset: jest.fn(), drawSquare: jest.fn() } as any;
  const testBoardSize = 5;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shold move snake on every loop step", () => {
    const game = new Game(snakeMock, uiMock, testBoardSize);

    game.loop();

    expect(snakeMock.move).toBeCalledTimes(1);
  });

  it("shold not move snake when there is no loop", () => {
    new Game(snakeMock, uiMock, testBoardSize);

    expect(snakeMock.move).not.toBeCalled();
  });

  it("shold reset board, snake and ui if game is over", () => {
    const loosingRuleSet = [() => ({ type: RuleResultType.GameOver })];
    const game = new Game(snakeMock, uiMock, testBoardSize, loosingRuleSet);

    game.loop();

    expect(snakeMock.reset).toBeCalled();
    expect(uiMock.reset).toBeCalled();
  });
});
