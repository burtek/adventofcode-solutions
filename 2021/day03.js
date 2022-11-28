// https://adventofcode.com/2021/day/3

const response = await fetch('https://adventofcode.com/2021/day/3/input');
const data = await response.text();
const lines = data.trim().split('\n');
const numbers = lines.map(line => parseInt(line, 2));

// PART 1

function getMcbLcbForBit(bitIndex, bits, data) {
  const mask = 2**(bits - bitIndex - 1);
  const ones = numbers.filter(num => num & mask).length;
  const zeros = numbers.filter(num => ~num & mask).length;
  const [mcb, lcb] = ones > zeros ? [1, 0] : [0, 1];
  return { mcb, lcb };
}

const bits = lines[0].length;
const { mcb, lcb } = Array.from({ length: bits }, (_, bitIndex) => getMcbLcbForBit(bitIndex, bits, numbers))
  .reduce(
    (acc, b) => {
      acc.mcb = (acc.mcb << 1) + b.mcb;
      acc.lcb = (acc.lcb << 1) + b.lcb;
      return acc; 
    },
    { mcb: 0, lcb: 0 }
  )

const result1 = mcb * lcb
console.log('part1: %d', result1);
