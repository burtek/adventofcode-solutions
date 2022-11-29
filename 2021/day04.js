// https://adventofcode.com/2021/day/4

const response = await fetch('https://adventofcode.com/2021/day/4/input');
const data = await response.text();
const lines = data.trim().split('\n\n');

const [randomsLine, ...boardsLines] = lines;
const randoms = randomsLine.split(',').map(Number);

const SIZE = 5;

// PART 1

class Board {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.board = input.split('\n').map(line => line.split(' ').filter(x => x).map(Number));
  }

  check() {
    return this.board.some(row => row.every(num => num === null)) ||
      this.board[0].some((_, col) => this.board.every(row => row[col] === null));
  }

  /**
   * @param {number} num number to cross out (to replace with `null`)
   * @returns {boolean}
   */
  cross(num) {
    this.board.forEach(row => {
      row.forEach((item, index) => {
        if (item === num) {
          row[index] = null;
        }
      });
    });
    return this.check();
  }

  /** @returns {number} sum of all not-yet-crossed-out numbers */
  getUncheckedSum() {
    return this.board.flatMap(row => row).filter(Boolean).reduce((a, b) => a + b);
  }
}

const boards1 = boardsLines.map(boardLine => new Board(boardLine));

for (const r of randoms) {
  const finished = boards1.find(board => board.cross(r));
  if (finished) {
    console.log('part1: %d', finished.getUncheckedSum() * r);
    break;
  }
}

// PART 2

const boards2 = boardsLines.map(boardLine => new Board(boardLine));

for (const r of randoms) {
  const finishedIndexes = boards2.flatMap((board, index) => board.cross(r) ? index : []);
  const res = finishedIndexes.find((i, j) => {
    const [removed] = boards2.splice(i - j, 1);
    if (!boards2.length) {
      console.log('part2: %d', removed.getUncheckedSum() * r);
      return true;
    }
  });
  if (res !== undefined) { break; }
}
