// https://adventofcode.com/2022/day/3

const response = await fetch('https://adventofcode.com/2022/day/3/input');
const data = await response.text();
const backpacks = data.trim().split('\n').map(line => line.split('').map(char => {
  const codePoints = char.codePointAt(0);
  return codePoints >= 97 ? codePoints - 96 : codePoints - 38;
}));

const sum = (a, b) => a + b;

// PART 1

const sum1 = backpacks
  .map(arr => [...arr])
  .map(arr => [arr.splice(0, arr.length / 2), arr])
  .map(([compartment1, compartment2]) => compartment1.find(item => compartment2.includes(item)))
  .reduce(sum);

console.log('part1: %d', sum1);

// PART 2

const sum2 = Array.from({ length: backpacks.length / 3 }, (_, i) => backpacks.slice(3 * i, 3 * i + 3))
  .map(([backpack1, backpack2, backpack3]) => backpack1.find(item => backpack2.includes(item) && backpack3.includes(item)))
  .reduce(sum);

console.log('part2: %d', sum2);
