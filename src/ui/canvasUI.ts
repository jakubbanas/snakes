import { Color, SnakeUI } from "../types";

class CanvasUI implements SnakeUI {
  private canvas: HTMLCanvasElement;
  private cellSize: number;
  private context: CanvasRenderingContext2D;

  setScore(score: number) {
    document.getElementById("score").innerHTML = String(score);
  }

  public drawSquare(x: number, y: number, color: string) {
    this.context.fillStyle = color;
    this.context.fillRect(
      x * this.cellSize,
      y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }

  public reset(): void {
    this.drawGrid();
  }

  private drawGrid() {
    this.context.beginPath();
    this.context.fillStyle = Color.WHITE;
    this.context.strokeStyle = Color.SILVER;
    this.context.fillRect(0, 0, this.canvas.height, this.canvas.width);

    for (let x = 0; x < this.canvas.width; x += this.cellSize) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.canvas.height);
    }

    for (let y = 0; y < this.canvas.height; y += this.cellSize) {
      this.context.moveTo(0, y);
      this.context.lineTo(this.canvas.width, y);
    }

    this.context.stroke();
  }

  constructor(canvas: HTMLCanvasElement, cellSize: number) {
    this.canvas = canvas;
    this.cellSize = cellSize;
    const context = this.canvas.getContext("2d");

    if (context === null) {
      throw Error("Cant get 2d context.");
    }

    this.context = context;
    this.drawGrid();
  }
}

export default CanvasUI;
