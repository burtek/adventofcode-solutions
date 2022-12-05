// https://adventofcode.com/2022/day/1

const response = await fetch('https://adventofcode.com/2022/day/1/input');
const data = await response.text();
const caloriesPerElf = data.trim().split('\n\n').map(e => e.split('\n').map(Number));

// PART 1

const sum = (a, b) => a + b;

const sumsSorted = caloriesPerElf.map(e => e.reduce(sum)).sort((a, b) => b - a);

console.log('part1: %d', sumsSorted[0]);

// PART 2

console.log('part2: %d', sumsSorted.slice(0, 3).reduce(sum));
