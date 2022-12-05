// https://adventofcode.com/2022/day/4

const response = await fetch('https://adventofcode.com/2022/day/4/input');
const data = await response.text();
/** @type {[[number, number], [number, number]][]} */
const pairs = data.trim().split('\n').map(line => line.split(',').map(elf => elf.split('-').map(Number)));

const inBetween = (a, b, c) => a <= b && b <= c;

class Range {
  /**
   * @param {number} a
   * @param {number} b
   */
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  get size() {
    return this.b - this.a + 1;
  }

  /**
   * @param {Range} other
   */
  contains({ a, b }) {
    return this.a <= a && b <= this.b;
  }

  /**
   * @param {Range} other
   */
  overlaps({ a, b }) {
    return inBetween(this.a, a, this.b) ||
        inBetween(this.a, b, this.b) ||
        inBetween(a, this.a, b) ||
        inBetween(a, this.b, b);
  }
}

/** @type {[Range, Range][]} */
const ranges = pairs.map(([range1, range2]) => [new Range(...range1), new Range(...range2)]);

// PART 1

const result1 = ranges.filter(([range1, range2]) => range1.contains(range2) || range2.contains(range1)).length;

console.log('part1: %d', result1);

// PART 2

const result2 = ranges.filter(([range1, range2]) => range1.overlaps(range2)).length;

console.log('part2: %d', result2);
