export type BoardState = number[][];

class Board {
  private state: BoardState;
  private size: number;

  constructor(size: number) {
    this.size = size;
    this.reset();
  }

  public setState(state: BoardState): void {
    this.state = state;
  }

  public getState(): BoardState {
    return this.state;
  }

  public update(x: number, y: number, value = 1): void {
    try {
      this.state[x][y] = value;
    } catch {}
  }

  public reset(): void {
    this.state = Array.from({ length: this.size }, () =>
      Array(this.size).fill(0)
    );
  }
}

export default Board;
