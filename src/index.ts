import TouchController from "./controllers/TouchController";
import WSADController from "./controllers/WSADController";
import Board from "./core/board";
import Game from "./core/game";
import Snake from "./core/snake";
import appleRule from "./rules/appleRule";
import poisonousAppleRule from "./rules/poisonousAppleRule";
import tailBiteRule from "./rules/tailBiteRule";
import wallCollisionRule from "./rules/wallCollisionRule";
import { Direction } from "./types";
import CanvasUI from "./ui/canvasUI";

const CELL_SIZE = 20;
const BOARD_SIZE = 25;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const stefan = new Snake("stefan");
const isMobile = Boolean(
  "ontouchstart" in document.documentElement &&
    navigator.userAgent.match(/Mobi/)
);
const controllerClass = isMobile ? TouchController : WSADController;
new controllerClass({
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
