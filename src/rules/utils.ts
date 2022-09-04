function randomNumber(max: number): number {
  return Math.floor(Math.random() * (max - 1));
}

export function randomPosition(x: number, y: number): number[] {
  return [randomNumber(x), randomNumber(y)];
}
