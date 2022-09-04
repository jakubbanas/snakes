import Game from "../../src/core/game";
import { BoardElement, Color, RuleResultType } from "../../src/types";

describe("Snake movement", () => {
  const snakeMock = {
    reset: jest.fn(),
    move: jest.fn(),
    feed: jest.fn(),
    getPosition: () => [[0, 0]],
  } as any;
  const uiMock = {
    reset: jest.fn(),
    drawSquare: jest.fn(),
    setScore: jest.fn(),
  } as any;
  const boardMock = {
    reset: jest.fn(),
    drawSquare: jest.fn(),
    setScore: jest.fn(),
    update: jest.fn(),
    getState: () => [
      [0, 0],
      [0, 0],
    ],
  } as any;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shold move snake on every loop step", () => {
    const game = new Game(snakeMock, uiMock, boardMock);

    game.loop();

    expect(snakeMock.move).toBeCalledTimes(1);
  });

  it("shold not move snake when there is no loop", () => {
    new Game(snakeMock, uiMock, boardMock);

    expect(snakeMock.move).not.toBeCalled();
  });

  it("shold reset board, snake and ui if game is over", () => {
    const loosingRuleSet = [() => ({ type: RuleResultType.GameOver })];
    const game = new Game(snakeMock, uiMock, boardMock, loosingRuleSet);

    game.loop();

    expect(snakeMock.reset).toBeCalled();
    expect(uiMock.reset).toBeCalled();
  });

  it("shold extend snake when rule has such action", () => {
    const snakeExtendingRuleSet = [
      () => ({ type: RuleResultType.SnakeExtend }),
    ];
    const game = new Game(snakeMock, uiMock, boardMock, snakeExtendingRuleSet);

    game.loop();

    expect(snakeMock.feed).toBeCalled();
  });

  it("should create an board object", () => {
    const createObjectRuleSet = [
      () => ({
        type: RuleResultType.CreateGameObject,
        payload: { position: [1, 1], type: BoardElement.poison },
      }),
    ] as any;
    const game = new Game(snakeMock, uiMock, boardMock, createObjectRuleSet);

    game.loop();

    expect(boardMock.update).toBeCalledWith(1, 1, BoardElement.poison);
  });

  it("should draw something on the ui", () => {
    boardMock.getState = () => [
      [1, 0],
      [0, 0],
    ];
    const game = new Game(snakeMock, uiMock, boardMock);

    game.loop();

    expect(uiMock.drawSquare).toBeCalledWith(0, 0, Color.BLACK);
  });
});
