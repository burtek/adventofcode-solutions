// https://adventofcode.com/2021/day/12

const response = await fetch('https://adventofcode.com/2021/day/12/input');
const data = await response.text();
const lines = data.trim().split('\n');

const edges = lines.map(line => line.split('-'));

/** @typedef {{ name: string, big: boolean, neighbours: string[] }} GraphNode */
/** @type {Record<string, GraphNode>} */
const map = {};
const createNode = name => ({ name, big: name[0].toUpperCase() === name[0], neighbours: [] });
edges.forEach(([from, to]) => {
  map[from] ??= createNode(from);
  map[to] ??= createNode(to);

  map[from].neighbours.push(to);
  map[to].neighbours.push(from);
});

// PART 1

/**
 * @param {string} node
 * @param {string[]} visited
 * @returns {string[][]}
 */
function traverse1(node = 'start', visited = []) {
  if (node === 'end') { return [visited]; }

  if (visited.includes(node) && !map[node].big) { return []; }

  return map[node].neighbours.flatMap(n => traverse1(n, [...visited, node]));
}

console.log('part1: %d', traverse1().length);

// PART 2

/**
 * @param {string} node
 * @param {string[]} visited
 * @returns {string[][]}
 */
function traverse2(node = 'start', visited = []) {
  if (node === 'end') { return [visited]; }

  if (visited.includes(node) && !map[node].big) {
    const hasAnySmallVisitedTwice = visited.some(name => !map[name].big && visited.filter(v => v === name).length > 1);
    if (hasAnySmallVisitedTwice || node === 'start') { return []; }
  }

  return map[node].neighbours.flatMap(n => traverse2(n, [...visited, node]));
}

console.log('part2: %d', traverse2().length);
