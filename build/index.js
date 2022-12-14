import { Heuristics, Puzzle } from './lib.js';
var start = new Date().getTime();
let puzzles = Puzzle.randomizePuzzles(Heuristics._manhattanHeuristic, 8, 100);
Puzzle.solvePuzzleArray(puzzles, 'output/output.txt', 'output/output.csv', false);
var end = new Date().getTime();
console.log('Time taken: ' + (end - start) + 'ms');
