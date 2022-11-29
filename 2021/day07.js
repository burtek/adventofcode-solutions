// https://adventofcode.com/2021/day/7

const response = await fetch('https://adventofcode.com/2021/day/7/input');
const data = await response.text();
const xs = data.trim().split(',').map(Number);

const min = Math.min(...xs);
const max = Math.max(...xs);

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

// PART 1

function calculate(diff) {
  return Math.min(...range(min, max).map(i => xs.reduce((acc, x) => acc + diff(x, i), 0)));
}

const diff1 = (a, b) => Math.abs(a - b);
const minRequired1 = calculate(diff1);

console.log('part1: %d', minRequired1);

// PART 2

const diff2 = (a, b) => {
  const n = Math.abs(a - b);
  return (1 + n) * n / 2;
};
const minRequired2 = calculate(diff2);

console.log('part2: %d', minRequired2);
