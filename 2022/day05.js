// https://adventofcode.com/2022/day/5

const response = await fetch('https://adventofcode.com/2022/day/5/input');
const data = await response.text();
const [data1, data2] = data.trim().split('\n\n').map(part => part.split('\n'));
const stacks = data1.pop()
  .trim()
  .split(/ +/)
  .map(Number)
  .reduce((acc, stack) => {
    acc[stack] ??= [];
    data1
      .map(line => line.substring(4 * (stack - 1) + 1, 4 * (stack - 1) + 2))
      .filter(crate => crate.trim())
      .forEach(crate => { acc[stack].push(crate); });
    return acc;
  }, /** @type {string[][]} */([]));
const instructions = data2.map(line => line.split(' ')).map(([, count,, from,, to]) => ({ count, from, to }));

// PART 1

/**
 * @param {Array<{ count: number, from: number, to: number }>} instructions
 * @param {string[][]} stacks
 */
function run(instructions, stacks, reverse = false) {
  const result = instructions.reduce(
    (stacks, { count, from, to }) => {
      const removed = stacks[from].splice(0, count);
      if (reverse) {
        removed.reverse();
      }
      stacks[to].unshift(...removed);
      return stacks;
    },
    // deep copy to work on
    Object.keys(stacks).reduce((acc, key) => Object.assign(acc, { [+key]: [...stacks[key]] }), /** @type {string[][]} */([]))
  );

  return result.map(r => r[0]).filter(r => r).join('').trim();
}

console.log('part1: %s', run(instructions, stacks, true));

// PART 2

// your code here

console.log('part2: %s', run(instructions, stacks, false));
