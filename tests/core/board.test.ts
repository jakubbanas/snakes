import Board from "../../src/core/board";

describe("Board data structure", () => {
  it("should generate an empty board", () => {
    const board = new Board(3);

    expect(board.getState()).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  it("should set and return a new state", () => {
    const board = new Board(3);

    const newState = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];
    board.setState(newState);

    expect(board.getState()).toEqual(newState);
  });

  it("should override previous state", () => {
    const board = new Board(3);

    const newState = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];
    board.setState(newState);

    const nextState = [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ];
    board.setState(nextState);

    expect(board.getState()).toEqual(nextState);
  });

  it("should update single field", () => {
    const board = new Board(3);

    const expectedState = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    board.update(1, 1);

    expect(board.getState()).toEqual(expectedState);
  });

  it("should reset to initial state", () => {
    const board = new Board(3);
    const initialState = board.getState().flat();

    board.update(1, 1);
    board.update(0, 0);
    board.reset();

    expect(board.getState().flat()).toEqual(initialState);
  });
});
