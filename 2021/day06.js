// https://adventofcode.com/2021/day/6

const response = await fetch('https://adventofcode.com/2021/day/6/input');
const data = await response.text();
const timers = data.trim().split(',').map(Number);

const initialCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
timers.forEach(t => { initialCounts[t]++; });

// PART 1

const DAYS = 80;

/**
 * @param {number} daysLeft
 * @returns {number}
 */
function calculate(days) {
  const counts = [...initialCounts];

  for (let day = 0; day < days; day++) {
    const birthing = counts.shift();

    counts[6] ??= 0;
    counts[6] += birthing;
    counts[8] ??= 0;
    counts[8] += birthing;
  }

  return counts.reduce((a, b) => a + b);
}

console.log('part1: %d', calculate(80));

// PART 2

console.log('part2: %d', calculate(256));
