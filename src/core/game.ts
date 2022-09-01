import Snake from "./snake";
import { Color, SnakeUI } from "../types";
import Board, { BoardElement, BoardState } from "./board";
import rulesManager, { Rule, RuleResult } from "../rules/rulesManager";

const boardElementColorMapping: { [key in BoardElement]: Color } = {
  [BoardElement.empty]: Color.WHITE,
  [BoardElement.apple]: Color.RED,
  [BoardElement.snake]: Color.BLACK,
};

class Game {
  private board: Board;
  private snake: Snake;
  private ui: SnakeUI;
  private rules: Rule[];

  constructor(
    snake: Snake,
    ui: SnakeUI,
    boardSize: number,
    rules: Rule[] = []
  ) {
    this.board = new Board(boardSize);
    this.snake = snake;
    this.ui = ui;
    this.rules = rules;
  }

  private drawBoardState(boardState: BoardState): void {
    for (let x = 0; x < boardState.length; x++) {
      for (let y = 0; y < boardState[x].length; y++) {
        const boardElement = boardState[x][y];
        if (boardElement === BoardElement.empty) {
          continue;
        }
        const color = boardElementColorMapping[boardElement];
        this.ui.drawSquare(x, y, color);
      }
    }
  }

  private reset() {
    this.ui.reset();
    this.board.reset();
    this.snake.reset();
  }

  private checkRules(): void {
    const ruleResults = rulesManager.checkRules(
      this.snake.getPosition(),
      this.board.getState(),
      this.rules
    );

    ruleResults.forEach((result) => {
      switch (result) {
        case RuleResult.GameOver:
          this.reset();
      }
    });
  }

  public loop() {
    this.checkRules();
    this.ui.reset();
    this.board.reset();
    this.snake.getPosition().forEach(([x, y]) => this.board.update(x, y));
    this.drawBoardState(this.board.getState());
    this.snake.move();
  }
}

export default Game;
