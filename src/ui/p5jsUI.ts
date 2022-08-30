import { Color, SnakeUI } from "../types";

class P5jsUI implements SnakeUI {
  reset: () => void;
  drawSquare: (x: number, y: number, color: Color) => void;
}

export default P5jsUI;
