// https://adventofcode.com/2021/day/11

const response = await fetch('https://adventofcode.com/2021/day/11/input');
const data = await response.text();
const lines = data.trim().split('\n');

// const SIZE = 10;
const STEPS = 100;

// PART 1

const board = lines.map(line => line.split('').map(Number).map(energy => ({ energy, flashed: false })));

function increaseEnergy(board, row, col) {
  if (board[row]?.[col] === undefined) {
    return 0;
  }

  let flashes = 0;

  board[row][col].energy++;
  if (board[row][col].energy > 9 && !board[row][col].flashed) {
    flashes++;
    board[row][col].flashed = true;
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        flashes += increaseEnergy(board, i, j);
      }
    }
  }
  return flashes;
}

let flashes = 0;
let step = 0;
for (; step < STEPS; step++) {
  let stepFlashes = 0;
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      stepFlashes += increaseEnergy(board, rowIndex, colIndex);
    });
  });
  flashes += stepFlashes;
  board.forEach(row => {
    row.forEach(cell => {
      if (cell.flashed) {
        cell.flashed = false;
        cell.energy = 0;
      }
    });
  });
}

console.log('part1: %d', flashes);

// PART 2

for (; ; step++) {
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      increaseEnergy(board, rowIndex, colIndex);
    });
  });
  board.forEach(row => {
    row.forEach(cell => {
      if (cell.flashed) {
        cell.flashed = false;
        cell.energy = 0;
      }
    });
  });

  if (
    board.every(row => row.every(cell => cell.energy === 0))
  ) {
    break;
  }
}

console.log('part2: %d', step + 1);
