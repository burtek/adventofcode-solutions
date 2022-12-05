// https://adventofcode.com/2021/day/14

const response = await fetch('https://adventofcode.com/2021/day/14/input');
const data = await response.text();
const [template, rulesRaw] = data.trim().split('\n\n');
/** @type {[string, string][]} */
const rulesArr = rulesRaw
  .split('\n').map(line => line.split(' -> '));
const rulesMap = new Map(rulesArr);

// PART 1

/**
 * @param {string} template
 * @param {number} steps
 * @returns {string}
 */
function processTemplate(template, steps) {
  if (steps === 0) { return template; }

  let result = Array.from(template)
    .flatMap((letter, index, { [index + 1]: nextLetter }) => nextLetter ? [letter, rulesMap.get(`${letter}${nextLetter}`)] : letter)
    .join('');
  return processTemplate(result, steps - 1);
}

/**
 * @param {string} input
 */
function findHighLow([...template]) {
  const letters = [...new Set(template)];
  const counts = letters.map(letter => ({ letter, count: template.filter(l => l === letter).length }));
  counts.sort(({ count: c1 }, { count: c2 }) => c1 - c2);

  return {
    high: counts.at(-1),
    low: counts.at(0)
  };
}

const { high: high1, low: low1 } = findHighLow(processTemplate(template, 10));
const result1 = high1.count - low1.count;

console.log('part1: %d', result1);

// PART 2 -- TODO

const { high: high2, low: low2 } = findHighLow(processTemplate(template, 40));
const result2 = high2.count - low2.count;

console.log('part2: %d', result2);
