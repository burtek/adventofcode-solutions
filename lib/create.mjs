/* eslint-env node */
/// <reference types="node" />

import { resolve } from 'node:path';
import { promises } from 'node:fs';

const [,, year, day] = process.argv;

const tempate = `// https://adventofcode.com/${year}/day/${day}

const response = await fetch('https://adventofcode.com/${year}/day/${day}/input');
const data = await response.text();
const lines = data.trim().split('\\n');

// PART 1

// your code here

console.log('part1: %d', result1);

// PART 2

// your code here

console.log('part2: %d', 0);
`;

const dir = resolve(process.cwd(), year);
await promises.mkdir(dir, { recursive: true });
await promises.writeFile(resolve(dir, `day${day.padStart(2, '0')}.js`), tempate, { encoding: 'utf-8', flag: 'wx' });
