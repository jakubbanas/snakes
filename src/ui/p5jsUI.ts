import { Color, SnakeUI } from "../types";

class P5jsUI implements SnakeUI {
  setScore: (score: number) => void;
  reset: () => void;
  drawSquare: (x: number, y: number, color: Color) => void;
}

export default P5jsUI;
