// https://adventofcode.com/2022/day/2

const response = await fetch('https://adventofcode.com/2022/day/2/input');
const data = await response.text();
/** @type {[string, string]} */
const lines = data.trim().split('\n').map(pair => pair.split(' '));

const SHAPES = {
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors',
};
const RESULTS = {
  WIN: 'win',
  LOSE: 'lose',
  DRAW: 'draw'
};
const RPS = {
  getPointsForShape: shape => 1 + [SHAPES.ROCK, SHAPES.PAPER, SHAPES.SCISSORS].indexOf(shape),
  getResult: (player, opponent) => ({ // roundPoints[player][opponent]
    [SHAPES.ROCK]: { [SHAPES.ROCK]: RESULTS.DRAW, [SHAPES.PAPER]: RESULTS.LOSE, [SHAPES.SCISSORS]: RESULTS.WIN },
    [SHAPES.PAPER]: { [SHAPES.ROCK]: RESULTS.WIN, [SHAPES.PAPER]: RESULTS.DRAW, [SHAPES.SCISSORS]: RESULTS.LOSE },
    [SHAPES.SCISSORS]: { [SHAPES.ROCK]: RESULTS.LOSE, [SHAPES.PAPER]: RESULTS.WIN, [SHAPES.SCISSORS]: RESULTS.DRAW },
  })[player][opponent],
  getShapeForOpponentAndResult: (opponent, result) => [SHAPES.ROCK, SHAPES.PAPER, SHAPES.SCISSORS].find(shape => RPS.getResult(shape, opponent) === result),
  getScoreForResult: result => [RESULTS.LOSE, RESULTS.DRAW, RESULTS.WIN].indexOf(result) * 3
};
const sum = (a, b) => a + b;

// PART 1

const result1 = lines
  .map(([opponent, player]) => ({
    opponent: ({ A: SHAPES.ROCK, B: SHAPES.PAPER, C: SHAPES.SCISSORS })[opponent],
    player: ({ X: SHAPES.ROCK, Y: SHAPES.PAPER, Z: SHAPES.SCISSORS })[player],
  }))
  .map(({ player, opponent }) => RPS.getPointsForShape(player) + RPS.getScoreForResult(RPS.getResult(player, opponent)))
  .reduce(sum);

console.log('part1: %d', result1);

// PART 2

const result2 = lines
  .map(([opponent, result]) => ({
    opponent: ({ A: SHAPES.ROCK, B: SHAPES.PAPER, C: SHAPES.SCISSORS })[opponent],
    result: ({ X: RESULTS.LOSE, Y: RESULTS.DRAW, Z: RESULTS.WIN })[result],
  }))
  .map(({ result, opponent }) => RPS.getPointsForShape(RPS.getShapeForOpponentAndResult(opponent, result)) + RPS.getScoreForResult(result))
  .reduce(sum);

console.log('part2: %d', result2);
