import { Heuristics, Puzzle, State } from './lib.js';
var start = new Date().getTime();
let puzzles = Puzzle.randomizePuzzles(Heuristics._manhattanHeuristic, 15, 1);
Puzzle.solvePuzzleArray(puzzles, '', '', false);
var end = new Date().getTime();
console.log('Time taken: ' + (end - start) + 'ms');