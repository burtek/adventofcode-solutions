// https://adventofcode.com/2021/day/5

const response = await fetch('https://adventofcode.com/2021/day/5/input');
const data = await response.text();
const dataLines = data.trim().split('\n');

const lines = dataLines
  .map(dataLine => dataLine
    .split(' -> ')
    .map(pair => pair.split(',').map(Number))
    .map(([x, y]) => ({ x, y })))
  .map(([from, to]) => ({ from, to }));

class Board {
  /**
   * @type {number[][]} board[x][y]
   */
  board = [];

  addLine({ from, to }) {
    let xs = this.makeRange(from.x, to.x);
    let ys = this.makeRange(from.y, to.y);
    if (xs.length === 1 && ys.length > 1) {
      xs = Array.from(ys, () => xs[0]);
    } else if (ys.length === 1 && xs.length > 1) {
      ys = Array.from(xs, () => ys[0]);
    }

    if (xs.length !== ys.length) {
      console.error({ from, to });
      throw new Error('unsupported');
    }

    xs.forEach((x, i) => {
      this.addPoint({ x, y: ys[i] });
    });
  }

  addPoint({ x, y }) {
    this.board[x] ??= [];
    this.board[x][y] ??= 0;

    this.board[x][y]++;
  }

  countAbove(num = 1) {
    return this.board.flatMap(row => row).filter(x => x > num).length;
  }

  makeRange(a, b) {
    return Array.from({ length: Math.abs(b - a) + 1 }, (_, i) => a < b ? a + i : a - i);
  }
}

// PART 1

const board1 = new Board;
lines
  .filter(({ from, to }) => from.x === to.x || from.y === to.y)
  .forEach(line => board1.addLine(line));

console.log('part1: %d', board1.countAbove(1));

// PART 2

const board2 = new Board;
lines
  .forEach(line => board2.addLine(line));

console.log('part2: %d', board2.countAbove(1));
