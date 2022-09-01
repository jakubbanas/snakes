import Snake from "./snake";
import { Color, Coordinate, SnakeUI } from "../types";
import Board, { BoardElement, BoardState } from "./board";
import rulesManager, {
  Rule,
  RuleResult,
  RuleResultType,
} from "../rules/rulesManager";

const boardElementColorMapping: { [key in BoardElement]: Color } = {
  [BoardElement.empty]: Color.WHITE,
  [BoardElement.apple]: Color.RED,
  [BoardElement.snake]: Color.BLACK,
};

export interface GameObject {
  type: BoardElement;
  position: Coordinate;
}

class Game {
  private board: Board;
  private snake: Snake;
  private gameObjects: GameObject[] = [];
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
    this.gameObjects = [];
  }

  private checkRules(): RuleResult[] {
    return rulesManager.checkRules(
      this.snake.getPosition(),
      this.board.getState(),
      this.rules
    );
  }

  private applyRuleResults(ruleResults: RuleResult[]): void {
    ruleResults.forEach((result) => {
      switch (result.type) {
        case RuleResultType.GameOver:
          this.reset();
          break;
        case RuleResultType.CreateGameObject:
          this.gameObjects.push(result.payload);
          break;
        case RuleResultType.SnakeExtend:
          this.snake.feed();
          this.gameObjects = [];
          break;
      }
    });
  }

  public loop() {
    const ruleResults = this.checkRules();
    this.ui.reset();
    this.board.reset();
    this.applyRuleResults(ruleResults);
    this.snake
      .getPosition()
      .forEach(([x, y]) => this.board.update(x, y, BoardElement.snake));
    this.gameObjects.forEach((gameObject) => {
      const { position, type } = gameObject;
      const [x, y] = position;
      this.board.update(x, y, type);
    });
    this.drawBoardState(this.board.getState());
    this.snake.move();
  }
}

export default Game;
