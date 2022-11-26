// https://adventofcode.com/2021/day/1

const response = await fetch('https://adventofcode.com/2021/day/1/input');
const data = await response.text();
const measurements = data.trim().split('\n').map(Number);

// PART 1

function countIncreases(array) {
  return Array.from(
    { length: array.length - 1 },
    (_, i) => array[i + 1] > array[i]
  ).filter(Boolean).length;
}

console.log('part1: %d', countIncreases(measurements));

// PART 2

const sum = (a, b) => a + b;
function makeSumsOf(count, array) {
  return Array.from(
    { length: array.length - (count - 1) },
    (_, i) => array.slice(i, i + count).reduce(sum)
  );
}

const sums = makeSumsOf(3, measurements);

console.log('part2: %d', countIncreases(sums));
