import Snake from "./core/snake";
import Game from "./core/game";
import CanvasUI from "./ui/canvasUI";
import KeyboardController from "./keyboardController";
import { Direction } from "./types";
import wallCollisionRule from "./rules/wallCollisionRule";
import appleRule from "./rules/appleRule";
import tailBiteRule from "./rules/tailBiteRule";
import poisonousAppleRule from "./rules/poisonousAppleRule";
import Board from "./core/board";

const CELL_SIZE = 20;
const BOARD_SIZE = 25;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const stefan = new Snake("stefan");
new KeyboardController({
  [Direction.DOWN]: () => stefan.setMovingDirection(Direction.DOWN),
  [Direction.UP]: () => stefan.setMovingDirection(Direction.UP),
  [Direction.LEFT]: () => stefan.setMovingDirection(Direction.LEFT),
  [Direction.RIGHT]: () => stefan.setMovingDirection(Direction.RIGHT),
});
const rules = [wallCollisionRule, appleRule, tailBiteRule, poisonousAppleRule];
const ui = new CanvasUI(canvas, CELL_SIZE);
const board = new Board(BOARD_SIZE);
const game = new Game(stefan, ui, board, rules);

setInterval(() => {
  game.loop();
}, 150);
