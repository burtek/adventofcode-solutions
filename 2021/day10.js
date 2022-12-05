// https://adventofcode.com/2021/day/10

const response = await fetch('https://adventofcode.com/2021/day/10/input');
const data = await response.text();
const lines = data.trim().split('\n');

const OPENER_TO_CLOSER = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};
// const CLOSER_TO_OPENER = {
//   ')': '(',
//   ']': '[',
//   '}': '{',
//   '>': '<',
// };
const ERROR_WEIGHTS = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};
const AUTOCOMPLETE_WEIGHTS = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
};

// PART 1

/**
 * @param {string} line
 * @returns {{ error: true, weight: number } | { unfinished: true, score: number }}
 */
function parseLine(line) {
  const globalChunks = [];
  const openers = [];

  for (let i = 0; i < line.length; i++) {
    if (Object.keys(OPENER_TO_CLOSER).includes(line[i])) {
      openers.push(line[i]);
    } else {
      const lastOpener = openers.pop();
      if (!lastOpener || OPENER_TO_CLOSER[lastOpener] !== line[i]) {
        return { error: true, weight: ERROR_WEIGHTS[line[i]] };
      } else if (openers.length === 0) {
        const start = globalChunks.at(-1)?.end ?? 0;
        const end = i + 1;
        globalChunks.push({ start, end, chunk: line.substring(start, end) });
      }
    }
  }

  if (openers.length) {
    return {
      unfinished: true,
      score: openers.reverse().reduce((score, opener) => score * 5 + AUTOCOMPLETE_WEIGHTS[opener], 0)
    };
  }
}

const result1 = lines
  .map(parseLine)
  .filter(result => result.error)
  .map(({ weight }) => weight)
  .reduce((a, b) => a + b);

console.log('part1: %d', result1);

// PART 2

const scores = lines
  .map(parseLine)
  .filter(result => result.unfinished)
  .map(({ score }) => score)
  .sort((a, b) => a - b);
const result2 = scores[(scores.length - 1) / 2];

console.log('part2: %d', result2);
