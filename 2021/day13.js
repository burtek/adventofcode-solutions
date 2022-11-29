// https://adventofcode.com/2021/day/13

const response = await fetch('https://adventofcode.com/2021/day/13/input');
const data = await response.text();
const [pointsRaw, foldsRaw] = data.trim().split('\n\n').map(part => part.split('\n'));

/** @typedef {{ x: number, y: number }} Point */
/** @typedef {{ coord: keyof Point, value: number }} Fold */

const points = pointsRaw.map(line => line.split(',').map(Number)).map(([x, y]) => /** @type {Point} */ ({ x, y }));
const folds = foldsRaw.map(line => line.replace('fold along ', '').split('=')).map(([coord, value]) => /** @type {Fold} */ ({ coord, value: Number(value) }));

// PART 1

/**
 * @param {Point} a
 * @param {Point} b
 * @returns {boolean}
 */
function samePoint(a, b) {
  return a.x === b.x && a.y === b.y;
}

/**
 * @param {Point[]} points
 * @returns {Point[]}
 */
function removeDuplicates(points) {
  return points.filter((point, index) => !points.slice(0, index).some(p => samePoint(p, point)));
}

/**
 * @param {Point[]} points
 * @param {Fold[]} folds
 * @returns {Point[]}
 */
function executeFolds(points, folds) {
  folds.forEach(({ coord, value }) => {
    points = removeDuplicates(points.map(point => ({ ...point, [coord]: point[coord] > value ? (2 * value - point[coord]) : point[coord] })));
  });
  return points;
}

console.log('part1: %d', executeFolds(points, [folds[0]]).length);

// PART 2

// your code here

const output = executeFolds(points, folds).reduce((canvas, { x, y }) => {
  canvas[y] ??= [];
  canvas[y][x] = '#';
  return Array.from(canvas, row => Array.from(row ?? [], cell => cell ?? ' '));
}, []).map(row => row.join('')).join('\n');

console.log('part2: \n%s', output);
