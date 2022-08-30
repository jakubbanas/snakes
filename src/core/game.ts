import Snake from "./snake";
import { Color, SnakeUI } from "../types";
import Board, { BoardState } from "./board";
import rulesManager, { Rule, RuleResult } from "../rules/rulesManager";

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
        if (boardState[x][y] === 0) {
          continue;
        }
        this.ui.drawSquare(x, y, Color.RED);
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
