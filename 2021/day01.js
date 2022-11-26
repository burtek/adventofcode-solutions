// https://adventofcode.com/2021/day/1

const response = await fetch('https://adventofcode.com/2021/day/1/input');
const data = await response.text();
const measurements = data.trim().split('\n').map(Number);

// PART 1

function countIncreases(array) {
  return Array.from({ length: array.length - 1 }, (_, i) => array[i+1] > array[i]).filter(Boolean).length;
}

const result1 = countIncreases(measurements);
console.log('part1: %d', result1);

// PART 2

function makeSumsOf(count) {
  return array => Array.from(
    { length: array.length - (count - 1) },
    (_, i) => Array.from(
      { length: count },
      (_, j) => array[i + j]
    ).reduce((a, b) => a + b)
  );
}

const sums = makeSumsOf(3)(measurements);

const result2 = countIncreases(sums);
console.log('part2: %d', result2);
