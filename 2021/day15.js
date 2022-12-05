// https://adventofcode.com/2021/day/15

const response = await fetch('https://adventofcode.com/2021/day/15/input');
const data = await response.text();
const smallMap = data.trim().split('\n').map(line => line.split('').map(Number));

// PART 1

// https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Algorithm
/** @param {number[][]} map */
function dijkstra(map) {
  const SIZE = map.length;
  let unvisited = map.flatMap((row, ri) => row.map((_, col) => /** @type {[row: number, col: number]} */([ri, col])));
  const distances = map.map(row => row.map(() => Infinity));
  distances[0][0] = 0;

  /** @type {[row: number, col: number]} */
  let current = [0, 0];
  do {
    const [currentRow, currentCol] = current;

    /** @type {[row: number, col: number][]} */
    const neighbors = [
      [currentRow - 1, currentCol],
      [currentRow, currentCol - 1],
      [currentRow + 1, currentCol],
      [currentRow, currentCol + 1],
    ].filter(([nRow, nCol]) => unvisited.some(([uRow, uCol]) => uRow === nRow && uCol === nCol));

    neighbors.forEach(([neighborRow, neighborCol]) => {
      const alt = distances[currentRow][currentCol] + map[neighborRow][neighborCol];
      if (alt < distances[neighborRow][neighborCol]) {
        distances[neighborRow][neighborCol] = alt;
      }
    });

    if (!unvisited.length) { break; }

    const unvisitedDistances = unvisited.map(([row, col]) => distances[row][col]);
    const minDistance = unvisitedDistances.reduce((a, b) => Math.min(a, b));// Math.min(...unvisitedDistances) exceeds max call stack;
    const newIndex = unvisitedDistances.findIndex(d => d === minDistance);
    [current] = unvisited.splice(newIndex, 1);
    console.log('popped!');
  } while (current);

  return distances[SIZE - 1][SIZE - 1];
}

console.log('part1: %d', dijkstra(smallMap));

// PART 2 -- TODO: works SLOW AS FUCK

const SMALL_WIDTH = smallMap[0].length;
const SMALL_HEIGHT = smallMap.length;
const largeMap = Array.from(
  { length: SMALL_HEIGHT * 5 },
  (_, row) => Array.from(
    { length: SMALL_WIDTH * 5 },
    (_, col) => {
      const origValue = smallMap[row % SMALL_HEIGHT][col % SMALL_WIDTH];
      const increment = Math.floor(row / SMALL_HEIGHT) + Math.floor(col / SMALL_WIDTH);
      let sum = origValue + increment;
      while (sum > 9) { sum -= 9; }
      return sum;
    }
  )
);


console.log('part2: %d', dijkstra(largeMap));
