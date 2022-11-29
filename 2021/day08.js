// https://adventofcode.com/2021/day/8

const response = await fetch('https://adventofcode.com/2021/day/8/input');
const data = await response.text();
const lines = data.trim().split('\n');

const inputs = lines.map(line => line.split(' | ').map(x => x.split(' '))).map(([uniques, input]) => ({ uniques, input }));

// PART 1

const result1 = inputs.flatMap(input => input.input).filter(input => [2, 3, 4, 7].includes(input.length)).length;

console.log('part1: %d', result1);

// PART 2

/** @type {(num: number) => (x: string) => boolean} */
const byLength = num => x => x.length === num;

/** @type {Record<string, number>} */
const SEGMENTS_NUM_MAP = {
  abcefg: 0,
  cf: 1,
  acdeg: 2,
  acdfg: 3,
  bcdf: 4,
  abdfg: 5,
  abdefg: 6,
  acf: 7,
  abcdefg: 8,
  abcdfg: 9,
};

/**
 * @param {{ uniques: string[], input: string[] }} param0
 */
function decode({ uniques, input }) {
  /*
   *  aaaa
   * b    c
   * b    c
   *  dddd
   * e    f
   * e    f
   *  gggg
   */

  const d235 = uniques.filter(byLength(5));
  const d069 = uniques.filter(byLength(6));

  const d1 = uniques.find(byLength(2));
  const d7 = uniques.find(byLength(3));
  const d4 = uniques.find(byLength(4));
  const d8 = uniques.find(byLength(7));

  const d6 = d069.find(d => !d1.split('').every(l => d.includes(l)));
  const d9 = d069.find(d => d4.split('').every(l => d.includes(l)));
  const d0 = d069.find(d => d !== d6 && d !== d9);

  const d3 = d235.find(d => d7.split('').every(l => d.includes(l)));

  const segA = d7.split('').find(l => !d1.includes(l));
  const segB = d4.split('').find(l => !d3.includes(l));
  const segC = d8.split('').find(l => !d6.includes(l));
  const segD = d8.split('').find(l => !d0.includes(l));
  const segE = d8.split('').find(l => !d9.includes(l));
  const segF = d1.split('').find(l => d6.includes(l));
  const segG = d3.split('').find(l => d0.includes(l) && !d7.includes(l));

  /** @type {Record<string, string>} */
  const segmentsMap = {
    [segA]: 'a',
    [segB]: 'b',
    [segC]: 'c',
    [segD]: 'd',
    [segE]: 'e',
    [segF]: 'f',
    [segG]: 'g',
  };

  return input
    .map(inputWord => inputWord
      .split('')
      .map(letter => segmentsMap[letter])
      .sort((a, b) => a.localeCompare(b))
      .join(''))
    .map(goodWord => SEGMENTS_NUM_MAP[goodWord])
    .reduce((num, digit) => num * 10 + digit);
}

const result2 = inputs.map(decode).reduce((sum, num) => sum + num);

console.log('part2: %d', result2);
