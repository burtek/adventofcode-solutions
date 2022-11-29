// https://adventofcode.com/2021/day/9

const response = await fetch('https://adventofcode.com/2021/day/9/input');
const data = await response.text();
const map = data.trim().split('\n').map(line => line.split('').map(Number));

// PART 1

/**
 * @param {number[][]} map
 * @param {number} row
 * @param {number} col
 * @returns {number[]}
 */
function getSurroundings(map, row, col) {
  return [
    map[row - 1]?.[col],
    map[row + 1]?.[col],
    map[row]?.[col - 1],
    map[row]?.[col + 1],
  ].filter(x => x !== undefined);
}

const lowPoints = map.flatMap((row, rowIndex) => row.filter((cell, colIndex) => getSurroundings(map, rowIndex, colIndex).every(h => h > cell)));

console.log('part1: %d', lowPoints.reduce((a, b) => a + b, 0) + lowPoints.length);

// PART 2

function* getUnassignedBasins(map) {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] !== null && map[row][col] !== 9) {
        yield [row, col];
      }
    }
  }
  return null;
}

function navigateFrom(map, row, col) {
  if (map[row]?.[col] === undefined || map[row]?.[col] === null || map[row][col] === 9) {
    return 0;
  }

  let changed = 1;
  map[row][col] = null;
  changed += navigateFrom(map, row - 1, col);
  changed += navigateFrom(map, row + 1, col);
  changed += navigateFrom(map, row, col - 1);
  changed += navigateFrom(map, row, col + 1);
  return changed;
}

const mutableMap = [...map.map(nums => [...nums])];
let biggest = [1, 1, 1];
for (let [row, col] of getUnassignedBasins(mutableMap)) {
  const size = navigateFrom(mutableMap, row, col);
  biggest = [...biggest, size].sort((a, b) => b - a).slice(0, 3);
}

console.log('part2: %d', biggest[0] * biggest[1] * biggest[2]);
