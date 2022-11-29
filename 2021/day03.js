// https://adventofcode.com/2021/day/3

const response = await fetch('https://adventofcode.com/2021/day/3/input');
const data = await response.text();
const lines = data.trim().split('\n');
const numbers = lines.map(line => line.split('').map(Number));
const bits = lines[0].length;

// PART 1

/** @typedef {0 | 1} Bit */
/** @typedef {Bit[]} BitNum */
/**
 * @param {BitNum[]} nums
 * @param {number} bitIndex
 * @returns {{ ones: BitNum[], zeros: BitNum[], mcb: Bit, lcb: Bit }}
 */
function getMcbLcbForBitIndex(nums, bitIndex) {
  const [ones, zeros] = nums.reduce(
    /**
     * @param {[BitNum[], BitNum[]]} param0
     * @param {BitNum} num
     * @returns {[BitNum[], BitNum[]]}
     */
    ([ones, zeros], num) => {
      (num[bitIndex] ? ones : zeros).push(num);
      return [ones, zeros];
    },
    [[], []]
  );
  const [mcb, lcb] = ones.length === zeros.length ? [null, null] : ones.length > zeros.length ? [1, 0] : [0, 1];
  return { ones, zeros, mcb, lcb };
}

const { mcb, lcb } = Array.from(
  { length: bits },
  (_, bitIndex) => getMcbLcbForBitIndex(numbers, bitIndex)
)
  .reduce(
    (acc, b) => {
      acc.mcb = (acc.mcb << 1) + b.mcb;
      acc.lcb = (acc.lcb << 1) + b.lcb;
      return acc;
    },
    { mcb: 0, lcb: 0 }
  );

console.log('part1: %d', mcb * lcb);

// PART 2

const [o2] = Array.from({ length: bits }).reduce((nums, _, bitIndex) => {
  if (nums.length <= 1) {
    return nums;
  }
  const result = getMcbLcbForBitIndex(nums, bitIndex);
  return result.mcb === 0 ? result.zeros : result.ones;
}, numbers);
const [co2] = Array.from({ length: bits }).reduce((nums, _, bitIndex) => {
  if (nums.length <= 1) {
    return nums;
  }
  const result = getMcbLcbForBitIndex(nums, bitIndex);
  return result.lcb === 1 ? result.ones : result.zeros;
}, numbers);

console.log('part2: %d', parseInt(o2.join(''), 2) * parseInt(co2.join(''), 2));
