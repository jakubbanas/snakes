import Snake from "../../src/core/snake";
import { Color, Direction } from "../../src/types";

describe("Snake", () => {
  it("should return snake name", () => {
    const testName = "test_snake";
    const snake = new Snake(testName);

    expect(snake.getName()).toBe(testName);
  });

  it("should reset snake position and direction", () => {
    const snake = new Snake("test_snake");

    snake.move();
    snake.reset();

    expect(snake.getPosition()).toStrictEqual([[0, 0]]);
  });

  it("should extend after feed", () => {
    const snake = new Snake("test_snake");
    expect(snake.getPosition().length).toBe(1);

    snake.feed();
    snake.move();

    expect(snake.getPosition().length).toBe(2);
  });

  it("should go down", () => {
    // |   |    |   |
    // |ooo| => | oo|
    // |   |    |  o|
    const snake = new Snake("test_snake");
    snake.setPosition([
      [5, 5],
      [6, 5],
      [7, 5],
    ]);
    snake.setMovingDirection(Direction.DOWN);

    snake.move();

    expect(snake.getPosition()).toEqual([
      [6, 5],
      [7, 5],
      [7, 6],
    ]);
  });

  it("should go up", () => {
    // |   |    |  o|
    // |ooo| => | oo|
    // |   |    |   |
    const snake = new Snake("test_snake");
    snake.setPosition([
      [5, 5],
      [6, 5],
      [7, 5],
    ]);
    snake.setMovingDirection(Direction.UP);

    snake.move();

    expect(snake.getPosition()).toEqual([
      [6, 5],
      [7, 5],
      [7, 4],
    ]);
  });

  it("should go left", () => {
    // | o |    |   |
    // | o | => | o |
    // | o |    |oo |
    const snake = new Snake("test_snake");
    snake.setPosition([
      [5, 5],
      [5, 6],
      [5, 7],
    ]);
    snake.setMovingDirection(Direction.LEFT);

    snake.move();

    expect(snake.getPosition()).toEqual([
      [5, 6],
      [5, 7],
      [4, 7],
    ]);
  });

  it("should go right", () => {
    // | o |    |   |
    // | o | => | o |
    // | o |    | oo|
    const snake = new Snake("test_snake");
    snake.setPosition([
      [5, 5],
      [5, 6],
      [5, 7],
    ]);
    snake.setMovingDirection(Direction.RIGHT);

    snake.move();

    expect(snake.getPosition()).toEqual([
      [5, 6],
      [5, 7],
      [6, 7],
    ]);
  });

  it("should not turn in tail direction", () => {
    // |    |    |    |
    // |ooo | => | ooo|
    // |    |    |    |
    const snake = new Snake("test_snake");
    snake.setPosition([
      [5, 5],
      [6, 5],
      [7, 5],
    ]);

    snake.setMovingDirection(Direction.LEFT);
    snake.move();

    expect(snake.getPosition()).toEqual([
      [6, 5],
      [7, 5],
      [8, 5],
    ]);
  });
});
