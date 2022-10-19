import { Heuristics, Puzzle, State } from './lib.js';
var start = new Date().getTime();
// let puzzles = Puzzle.randomizePuzzles(Heuristics._manhattanHeuristic, 8, 10);
const ps = [
    [15, 10, 0, 5, 1, 8, 9, 6, 13, 4, 14, 12, 3, 11, 2, 7],
    [6, 13, 5, 9, 3, 7, 12, 0, 1, 4, 15, 2, 11, 8, 10, 14],
    [6, 7, 0, 8, 5, 13, 3, 15, 1, 9, 4, 12, 11, 10, 2, 14],
    [10, 12, 5, 15, 0, 14, 6, 8, 13, 7, 11, 9, 3, 4, 1, 2],
    [1, 3, 9, 2, 11, 14, 0, 4, 7, 5, 13, 12, 6, 10, 8, 15],
    [10, 8, 9, 14, 7, 4, 11, 12, 15, 0, 13, 6, 3, 1, 5, 2],
    [15, 3, 13, 9, 12, 1, 14, 11, 8, 10, 7, 6, 2, 4, 5, 0],
    [8, 3, 13, 6, 12, 10, 5, 7, 11, 14, 9, 0, 2, 4, 1, 15],
    [8, 0, 7, 1, 14, 13, 15, 6, 4, 12, 5, 3, 11, 10, 9, 2],
    [7, 1, 10, 5, 11, 14, 8, 6, 0, 3, 12, 9, 4, 15, 2, 13],
    [15, 3, 7, 5, 10, 2, 0, 6, 12, 8, 11, 1, 13, 14, 4, 9],
    [6, 15, 2, 14, 13, 3, 8, 7, 10, 1, 12, 0, 9, 4, 5, 11],
    [9, 15, 14, 2, 10, 3, 7, 5, 1, 11, 8, 0, 6, 13, 4, 12],
    [3, 1, 9, 10, 11, 12, 6, 2, 13, 15, 0, 5, 8, 14, 7, 4],
    [3, 9, 5, 1, 2, 8, 10, 7, 15, 0, 12, 14, 13, 11, 4, 6],
    [9, 0, 7, 5, 14, 6, 12, 4, 3, 13, 1, 15, 2, 11, 10, 8],
    [15, 2, 4, 7, 6, 5, 1, 0, 9, 3, 10, 12, 14, 11, 8, 13],
    [11, 9, 4, 13, 10, 7, 6, 0, 3, 2, 12, 1, 5, 15, 14, 8],
    [3, 7, 15, 2, 10, 11, 12, 6, 13, 4, 0, 1, 5, 9, 8, 14],
    [12, 10, 9, 4, 6, 5, 13, 15, 2, 7, 8, 14, 3, 0, 11, 1],
    [1, 13, 5, 15, 4, 6, 11, 0, 10, 8, 9, 2, 14, 12, 3, 7],
    [6, 5, 13, 0, 1, 10, 15, 12, 3, 4, 11, 2, 14, 7, 8, 9],
    [5, 8, 11, 13, 4, 10, 2, 0, 15, 3, 6, 14, 9, 1, 12, 7],
    [6, 8, 10, 0, 1, 11, 15, 9, 12, 2, 4, 5, 13, 14, 7, 3],
    [15, 10, 2, 7, 9, 13, 5, 4, 0, 1, 12, 3, 6, 14, 8, 11],
    [7, 8, 9, 15, 11, 10, 1, 6, 13, 3, 14, 0, 2, 5, 12, 4],
    [6, 5, 8, 12, 2, 11, 7, 9, 14, 4, 1, 3, 13, 10, 0, 15],
    [10, 15, 7, 8, 4, 3, 6, 0, 5, 9, 13, 14, 11, 12, 2, 1],
    [10, 13, 6, 14, 2, 4, 8, 1, 9, 11, 7, 0, 5, 12, 3, 15],
    [5, 0, 13, 12, 11, 2, 8, 7, 6, 10, 3, 4, 15, 1, 9, 14],
    [5, 11, 12, 4, 9, 6, 14, 8, 1, 2, 0, 15, 3, 7, 13, 10],
    [10, 7, 13, 1, 14, 9, 12, 8, 5, 4, 0, 3, 11, 6, 15, 2],
    [8, 2, 14, 15, 9, 10, 7, 3, 4, 6, 12, 5, 0, 1, 11, 13],
    [5, 12, 7, 13, 8, 10, 15, 1, 2, 14, 9, 11, 4, 3, 0, 6],
    [9, 3, 1, 7, 13, 2, 11, 6, 5, 0, 12, 4, 8, 10, 15, 14],
    [11, 14, 12, 15, 8, 3, 0, 2, 1, 9, 10, 5, 6, 4, 7, 13],
    [6, 7, 2, 1, 15, 11, 3, 13, 8, 5, 4, 10, 14, 9, 12, 0],
    [5, 10, 6, 1, 9, 8, 2, 4, 12, 3, 14, 15, 11, 13, 0, 7],
    [7, 15, 5, 13, 3, 14, 9, 12, 6, 4, 2, 11, 10, 0, 1, 8],
    [13, 12, 11, 1, 8, 2, 10, 9, 15, 3, 6, 7, 14, 5, 0, 4],
    [10, 1, 12, 5, 13, 14, 9, 6, 2, 7, 4, 3, 0, 15, 8, 11],
    [14, 4, 8, 5, 9, 10, 7, 13, 2, 11, 15, 1, 0, 12, 3, 6],
    [11, 13, 2, 6, 12, 0, 1, 3, 5, 8, 10, 15, 9, 14, 7, 4],
    [13, 2, 7, 1, 6, 10, 0, 8, 4, 11, 14, 9, 3, 15, 5, 12],
    [1, 6, 2, 7, 15, 3, 0, 12, 14, 4, 10, 5, 8, 13, 9, 11],
    [14, 3, 13, 10, 0, 2, 9, 6, 15, 11, 12, 5, 4, 8, 7, 1],
    [7, 6, 8, 10, 0, 13, 12, 5, 1, 11, 14, 2, 3, 4, 9, 15],
    [3, 2, 14, 9, 13, 6, 10, 7, 4, 5, 8, 15, 1, 12, 0, 11],
    [13, 0, 14, 15, 5, 11, 1, 2, 10, 6, 3, 9, 4, 12, 7, 8],
    [8, 1, 0, 14, 7, 3, 5, 4, 9, 13, 6, 11, 12, 10, 2, 15],
    [6, 12, 5, 8, 13, 1, 3, 9, 0, 7, 11, 10, 2, 4, 15, 14],
    [12, 6, 9, 15, 11, 7, 13, 10, 5, 1, 3, 0, 4, 2, 8, 14],
    [11, 7, 6, 13, 3, 14, 15, 5, 10, 2, 12, 9, 4, 1, 8, 0],
    [7, 12, 9, 3, 14, 6, 4, 11, 5, 1, 8, 10, 13, 15, 2, 0],
    [9, 12, 1, 10, 14, 3, 6, 4, 0, 7, 13, 8, 2, 15, 11, 5],
    [7, 8, 5, 4, 15, 14, 12, 9, 13, 2, 11, 3, 10, 0, 1, 6],
    [14, 1, 0, 13, 12, 4, 11, 3, 9, 5, 10, 15, 6, 7, 8, 2],
    [9, 14, 8, 1, 13, 2, 12, 3, 6, 11, 7, 0, 5, 15, 4, 10],
    [14, 3, 4, 11, 1, 6, 9, 15, 7, 5, 10, 13, 0, 12, 8, 2],
    [9, 13, 14, 4, 6, 5, 2, 0, 15, 10, 3, 1, 12, 11, 8, 7],
    [5, 13, 0, 14, 6, 3, 1, 12, 7, 8, 2, 11, 4, 10, 15, 9],
    [3, 12, 2, 4, 7, 0, 9, 1, 13, 11, 15, 10, 5, 8, 6, 14],
    [14, 11, 10, 5, 0, 8, 4, 3, 2, 1, 9, 15, 13, 12, 6, 7],
    [3, 14, 5, 0, 11, 15, 1, 7, 12, 13, 8, 4, 2, 6, 9, 10],
    [9, 15, 7, 13, 1, 6, 11, 8, 2, 14, 10, 4, 0, 3, 12, 5],
    [9, 3, 7, 10, 0, 4, 14, 5, 8, 15, 1, 11, 12, 6, 2, 13],
    [9, 14, 6, 3, 5, 13, 1, 4, 7, 15, 0, 12, 11, 8, 10, 2],
    [10, 15, 4, 8, 7, 9, 14, 6, 1, 11, 12, 3, 5, 0, 2, 13],
    [2, 15, 9, 1, 0, 14, 10, 13, 11, 7, 5, 6, 3, 12, 4, 8],
    [2, 10, 4, 8, 0, 11, 7, 14, 1, 13, 5, 9, 12, 6, 15, 3],
    [5, 6, 13, 4, 11, 9, 1, 8, 12, 2, 10, 3, 15, 14, 0, 7],
    [15, 0, 7, 2, 10, 1, 3, 14, 4, 5, 8, 13, 6, 12, 11, 9],
    [11, 2, 12, 6, 10, 9, 1, 15, 8, 5, 13, 0, 14, 7, 3, 4],
    [14, 1, 8, 15, 5, 7, 3, 0, 11, 12, 10, 6, 4, 13, 2, 9],
    [11, 0, 8, 10, 14, 9, 13, 7, 2, 12, 4, 1, 5, 6, 3, 15],
    [1, 11, 13, 3, 5, 8, 9, 10, 12, 7, 14, 4, 15, 2, 0, 6],
    [14, 8, 2, 9, 4, 6, 10, 13, 1, 0, 15, 5, 3, 11, 12, 7],
    [7, 12, 0, 2, 4, 5, 1, 14, 3, 6, 15, 13, 9, 11, 8, 10],
    [6, 3, 14, 7, 5, 11, 13, 12, 10, 0, 8, 2, 1, 4, 15, 9],
    [3, 9, 13, 8, 5, 15, 12, 2, 7, 6, 11, 14, 1, 0, 10, 4],
    [3, 11, 8, 13, 10, 6, 1, 0, 2, 9, 4, 5, 7, 14, 12, 15],
    [14, 8, 3, 2, 7, 9, 10, 11, 13, 0, 4, 5, 15, 6, 1, 12],
    [10, 7, 0, 6, 3, 11, 2, 14, 13, 4, 5, 8, 15, 12, 1, 9],
    [15, 14, 2, 0, 8, 13, 12, 3, 9, 1, 5, 11, 6, 7, 4, 10],
    [8, 1, 2, 7, 3, 10, 11, 5, 13, 9, 0, 4, 6, 15, 12, 14],
    [1, 0, 3, 5, 15, 6, 10, 8, 9, 7, 13, 4, 11, 14, 12, 2],
    [12, 11, 9, 14, 3, 15, 0, 7, 6, 5, 2, 8, 10, 4, 13, 1],
    [15, 5, 11, 14, 3, 7, 2, 10, 4, 6, 9, 13, 0, 12, 1, 8],
    [2, 11, 1, 5, 8, 0, 4, 3, 9, 13, 15, 10, 12, 14, 7, 6],
    [8, 6, 13, 4, 1, 10, 11, 12, 0, 7, 15, 2, 5, 9, 3, 14],
    [9, 4, 12, 3, 0, 10, 1, 7, 5, 14, 15, 8, 11, 13, 6, 2],
    [2, 6, 10, 13, 9, 15, 8, 1, 3, 0, 14, 7, 5, 4, 12, 11],
    [0, 10, 6, 4, 7, 9, 15, 12, 1, 13, 3, 5, 8, 14, 11, 2],
    [10, 3, 11, 6, 2, 5, 15, 4, 1, 14, 13, 8, 9, 0, 12, 7],
    [2, 13, 12, 14, 1, 9, 11, 6, 5, 7, 15, 0, 10, 3, 8, 4],
    [15, 12, 10, 3, 4, 8, 2, 1, 0, 9, 7, 6, 14, 11, 5, 13],
    [10, 11, 5, 8, 6, 2, 14, 12, 15, 9, 3, 0, 4, 1, 13, 7],
    [12, 15, 13, 5, 1, 8, 3, 7, 11, 4, 6, 10, 14, 2, 0, 9],
    [4, 12, 14, 1, 13, 2, 9, 8, 10, 7, 6, 15, 5, 3, 11, 0],
    [14, 8, 13, 15, 12, 4, 0, 1, 9, 2, 6, 3, 5, 7, 11, 10]
];
var puzzles = [];
// for (var p of ps) {
//   puzzles.push(new State(p, Math.sqrt(p.length), 0, null, [], Heuristics._manhattanHeuristic));
// }
// loop backwards through the puzzles
for (var i = ps.length - 1; i >= 0; i--) {
    const p = ps[i];
    puzzles.push(new State(p, Math.sqrt(p.length), 0, null, [], Heuristics._manhattanHeuristic));
}
Puzzle.solvePuzzleArray(puzzles, 'output/output.txt', 'output/output.csv', true);
var end = new Date().getTime();
console.log('Time taken: ' + (end - start) + 'ms');
