// https://adventofcode.com/2021/day/2

const response = await fetch('https://adventofcode.com/2021/day/2/input');
const data = await response.text();
const commands = data.trim().split('\n').map(line => { const [command, value] = line.split(' '); return { command, value: Number(value) }; });

// PART 1

const { x: x1, y: y1 } = commands.reduce(
  ({ x, y }, { command, value }) => {
    switch(command) {
      case 'forward': return { x: x + value, y };
      case 'up': return { x, y: y - value };
      case 'down': return { x, y: y + value }; 
    }
  },
  { x: 0, y: 0 }
);
const result1 = x1 * y1;
console.log('part1: %d', result1);

// PART 2

const { x: x2, y: y2 } = commands.reduce(
  ({ aim, x, y }, { command, value }) => {
    switch(command) {
      case 'forward': return { aim, x: x + value, y: y + aim * value };
      case 'up': return { aim: aim - value, x, y };
      case 'down': return { aim: aim + value, x, y }; 
    }
  },
  { aim: 0, x: 0, y: 0 }
);
const result2 = x2 * y2;
console.log('part2: %d', result2);
