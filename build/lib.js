// var Heap = require('minheap');
import Heap from 'minheap';
import * as fs from 'fs';
export class Heuristics {
    constructor() {
        this.DISPLACEMENT = Heuristics._displacementHeuristic;
        this.MANHATTAN = Heuristics._manhattanHeuristic;
        this.ROWCOL = Heuristics._outOfRowColoumnHeuristic;
        this.EUCLIDEAN = Heuristics._euclideanHeuristic;
        this.LINEARCONFLICT = Heuristics._linearConflictHeuristic;
    }
    static _displacementHeuristic(state) {
        let count = 0;
        for (let i = 0; i < state.boardLength; i++) {
            if (state.board[i] != 0 && state.board[i] != i) {
                count += 1;
            }
        }
        return count;
    }
    static _manhattanHeuristic(state) {
        let h = 0;
        for (let i = 0; i < state.boardLength; i++) {
            if (state.board[i] != 0) {
                let [x1, y1] = state._get2dCoord(i);
                let [x2, y2] = state._get2dCoord(state.board[i]);
                h += Math.abs(x1 - x2) + Math.abs(y1 - y2);
            }
        }
        return h;
    }
    static _outOfRowColoumnHeuristic(state) {
        let h = 0;
        for (let i = 0; i < state.boardLength; i++) {
            if (state.board[i] != 0) {
                let [x1, y1] = state._get2dCoord(i);
                let [x2, y2] = state._get2dCoord(state.board[i]);
                if (x1 != x2) {
                    h += 1;
                }
                if (y1 != y2) {
                    h += 1;
                }
            }
        }
        return h;
    }
    static _linearConflictHeuristic(state) {
        let h = 0;
        for (let i = 0; i < state.boardLength; i++) {
            if (state.board[i] != 0) {
                let [x1, y1] = state._get2dCoord(i);
                let [x2, y2] = state._get2dCoord(state.board[i]);
                h += Math.abs(x1 - x2) + Math.abs(y1 - y2);
                if (y1 == y2) { // Tile is in the same row as it's goal tile
                    for (let j = 0; j < state.boardLength; j++) { // Check if there is a tile in the same row that gives a linear conflict
                        if (state.board[j] != 0) {
                            let [x3, y3] = state._get2dCoord(j);
                            let [x4, y4] = state._get2dCoord(state.board[j]);
                            if (y3 == y1) { // on the same row
                                if (x3 < x1 && x4 >= x1) { // tile is in the way
                                    h += 2;
                                }
                            }
                        }
                    }
                }
                if (x1 == x2) { // Tile is in the same coloumn as it's goal tile
                    for (let j = 0; j < state.boardLength; j++) { // Check if there is a tile in the same coloumn that gives a linear conflict
                        if (state.board[j] != 0) {
                            let [x3, y3] = state._get2dCoord(j);
                            let [x4, y4] = state._get2dCoord(state.board[j]);
                            if (x3 == x1) { // on the same col
                                if (y3 < y1 && y4 >= y1) { // tile is in the way
                                    h += 2;
                                }
                            }
                        }
                    }
                }
            }
        }
        return h;
    }
    static _euclideanHeuristic(state) {
        // ----------------------------------------------------------
        // Description: Calculate the euclidean distance of the state.
        // Use: puzzles = Puzzle.randomizePuzzle(Heuristics.EUCLIDEAN, 8)
        // ----------------------------------------------------------
        // Parameters:
        //   state - The state to calculate the euclidean distance of.
        // Returns:
        //   h - The euclidean distance of the state.
        // ----------------------------------------------------------
        let h = 0;
        for (let i = 0; i < state.boardLength; i++) {
            if (state.board[i] != 0) {
                let [x1, y1] = state._get2dCoord(i);
                let [x2, y2] = state._get2dCoord(state.board[i]);
                h += Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
            }
        }
        return h;
    }
    static stringToHeuristic(heuristic) {
        // ----------------------------------------------------------
        // Description: Convert a string to a heuristic function.
        // Use: heuristic = Heuristics.stringToHeuristic("euclidean")
        // ----------------------------------------------------------
        // Parameters:
        //   heuristic - The string to convert.
        // Returns:
        //   h - The heuristic function.
        // ----------------------------------------------------------
        switch (heuristic) {
            case "displacement":
                return Heuristics._displacementHeuristic;
            case "manhattan":
                return Heuristics._manhattanHeuristic;
            case "outOfRowColoumn":
                return Heuristics._outOfRowColoumnHeuristic;
            case "linearConflict":
                return Heuristics._linearConflictHeuristic;
            case "euclidean":
                return Heuristics._euclideanHeuristic;
            case "_displacementHeuristic":
                return Heuristics._displacementHeuristic;
            case "_manhattanHeuristic":
                return Heuristics._manhattanHeuristic;
            case "_outOfRowColoumnHeuristic":
                return Heuristics._outOfRowColoumnHeuristic;
            case "_linearConflictHeuristic":
                return Heuristics._linearConflictHeuristic;
            case "_euclideanHeuristic":
                return Heuristics._euclideanHeuristic;
            default:
                return Heuristics._manhattanHeuristic;
        }
    }
}
export class Puzzle {
    static randomizePuzzles(heuristic, size, numPuzzles) {
        try {
            if (Math.sqrt(size + 1) % 1 != 0) {
                throw new Error("Size must be a perfect square.");
            }
            var puzzles = [];
            while (puzzles.length < numPuzzles) {
                var _board = Array.from(Array(size + 1).keys());
                var board = _board.sort((a, b) => 0.5 - Math.random());
                var s = new State(board, Math.sqrt(board.length), 0, null, [], heuristic);
                if (s.isSolvable()) {
                    puzzles.push(s);
                }
            }
            return puzzles;
        }
        catch (e) {
            console.log(e);
            return;
        }
    }
    static solvePuzzleArray(puzzles, outputFile, outputCSV, debug = false) {
        let count = 1;
        let totalStats = {
            timeTaken: 0,
            numNodesExplored: 0,
            numStepsToSolution: 0,
            nodesPerSecond: 0
        };
        fs.writeFileSync(outputCSV, "Puzzle ID,Puzzle,Time Taken(s),Nodes Explored,Steps to Solution,Nodes per Second\n");
        fs.writeFileSync(outputFile, "");
        for (const puzzle of puzzles) {
            const stats = Puzzle.solvePuzzle(puzzle, debug);
            // Update total stats
            totalStats.numNodesExplored += stats["numNodesExplored"];
            totalStats.timeTaken += stats["timeTaken"];
            totalStats.nodesPerSecond += stats["nodesPerSecond"];
            totalStats.numStepsToSolution += stats["pathToSolution"].length;
            // Write to CSV
            fs.appendFileSync(outputCSV, `${count},${stats["startingBoard"]},${stats["timeTaken"] / 1000},${stats["numNodesExplored"]},${stats["pathToSolution"].length},${stats["nodesPerSecond"]}\n`);
            // Write to file
            fs.appendFileSync(outputFile, `-`.repeat(150) + "\n");
            fs.appendFileSync(outputFile, `Puzzle # ${count} | ${stats["startingBoard"]}\n`);
            fs.appendFileSync(outputFile, `\tTime taken to solve: ${stats["timeTaken"] / 1000} seconds\n`);
            fs.appendFileSync(outputFile, `\tNumber of nodes explored: ${stats["numNodesExplored"]}\n`);
            fs.appendFileSync(outputFile, `\tNumber of steps to solution: ${stats["pathToSolution"].length}\n`);
            fs.appendFileSync(outputFile, `\tNodes per second: ${stats["nodesPerSecond"]}\n`);
            fs.appendFileSync(outputFile, `\tPath to solution: ${stats["pathToSolution"]}\n`);
            count += 1;
        }
        // print average stats
        console.log("=".repeat(150));
        console.log(`Average Stats for ${puzzles.length} ${puzzles[0].boardLength - 1}-Puzzles:`);
        console.log({
            "Time Taken": `${totalStats.timeTaken / puzzles.length}ms`,
            "Nodes Explored": `${totalStats.numNodesExplored / puzzles.length}`,
            "Nodes Per Second": `${totalStats.nodesPerSecond / puzzles.length}`,
            "Steps to Solution": `${totalStats.numStepsToSolution / puzzles.length}`
        });
        console.log("=".repeat(150));
        // Write average stats to file
        fs.appendFileSync(outputFile, "=".repeat(150) + "\n");
        fs.appendFileSync(outputFile, `Average Stats for ${puzzles.length} ${puzzles[0].boardLength - 1}-Puzzles:\n`);
        fs.appendFileSync(outputFile, `\tTime Taken: ${totalStats.timeTaken / puzzles.length}ms\n`);
        fs.appendFileSync(outputFile, `\tNodes Explored: ${totalStats.numNodesExplored / puzzles.length}\n`);
        fs.appendFileSync(outputFile, `\tSteps to Solution: ${totalStats.numStepsToSolution / puzzles.length}\n`);
        fs.appendFileSync(outputFile, `\tNodes Per Second: ${totalStats.nodesPerSecond / puzzles.length}\n`);
        fs.appendFileSync(outputFile, "=".repeat(150) + "\n");
        return;
    }
    static solvePuzzle(s, debug = false) {
        let explored = {};
        let frontier = new Heap((a, b) => {
            const primary = a.f - b.f;
            const secondary = a.h - b.h;
            return primary == 0 ? secondary : primary;
        }); // create heap
        let startingBoard = s;
        let start = new Date().getTime();
        frontier.push({ f: s.f, h: s.h, str: s.getStateAsStr() });
        if (debug)
            console.log(`start:\t${State.arrayToStr(s.board)}`);
        let count = 0;
        while (frontier.len) { // loop until frontier is empty
            let s = State.strToState(frontier.pop()['str']);
            let exploredCost = explored[State.arrayToStr(s.board)];
            if (exploredCost) {
                if (exploredCost <= s.g) { // if the explored cost is less than the current cost, then we don't need to explore this state
                    continue;
                }
            }
            explored[State.arrayToStr(s.board)] = s.g;
            if (s.h == 0) { // check if at the goal state
                // pass the solution and stats back to the caller
                let end = new Date().getTime();
                let stats = {
                    timeTaken: end - start,
                    numNodesExplored: Object.keys(explored).length,
                    pathToSolution: [...s.path],
                    nodesPerSecond: Object.keys(explored).length / ((end - start) != 0 ? (end - start) : 0.01),
                    startingBoard: startingBoard.board.join('-')
                };
                if (debug) {
                    console.log(`\ndone:\t${State.arrayToStr(s.board)}`);
                    console.log(stats);
                }
                return stats;
            }
            if (debug) {
                if (Object.keys(explored).length % 100000 == 0) {
                    console.log('#explored:\t', explored.length);
                    const now = new Date().getTime();
                    console.log(`nps:\t\t ${explored.length / (now - start)}\n`);
                }
            }
            // console.log(s.getMoves());
            // console.log(frontier);
            // if (count > 3) break;
            for (let move of s.getMoves()) { // add all possible moves to the frontier
                frontier.push(move);
            }
            count++;
        }
    }
}
export class State {
    constructor(board, width, g = 0, h = null, path = [], heuristic = Heuristics._manhattanHeuristic) {
        this.g = 0;
        this.h = null;
        this.f = 0;
        this.board = board;
        this.boardLength = board.length;
        this.width = width;
        this.heuristicFunction = heuristic;
        this.g = g;
        this.h = h == null ? this.heuristicFunction(this) : h;
        this.f = this.g + this.h;
        this.path = path;
    }
    _get2dCoord(index) {
        return [index % this.width, Math.floor(index / this.width)];
    }
    getMoves() {
        let moves = [];
        let index = this.board.indexOf(0);
        let row = Math.floor(index / this.width);
        let col = index % this.width;
        if (row > 0) {
            let move = this._swap(index, index - this.width);
            if (move)
                moves.push(move);
        }
        if (row < this.width - 1) {
            let move = this._swap(index, index + this.width);
            if (move)
                moves.push(move);
        }
        if (col > 0) {
            let move = this._swap(index, index - 1);
            if (move)
                moves.push(move);
        }
        if (col < this.width - 1) {
            let move = this._swap(index, index + 1);
            if (move)
                moves.push(move);
        }
        return moves;
    }
    _swap(index1, index2) {
        let board = this.board.slice();
        let step = board[index2];
        if (step == this.path[this.path.length - 1])
            return null;
        board[index1] = board[index2];
        board[index2] = 0;
        let newState = new State(board, this.width, this.g + 1, null, this.path.concat([step]), this.heuristicFunction);
        return { f: newState.f, h: newState.h, str: newState.getStateAsStr() };
    }
    getStateAsStr() {
        return `${State.arrayToStr(this.board)}|${this.g}|${this.h}|${State.arrayToStr(this.path)}|${this.heuristicFunction.name}`;
    }
    static arrayToStr(board) {
        return board.join(',');
    }
    static strToState(str) {
        const [boardAsStr, g, h, pathAsStr, heuristic] = str.split('|'); // split the string into the board, g, h, path, and heuristic
        const board = boardAsStr.split(',').map((x) => parseInt(x)); // convert the stringified board to a list of ints
        const path = pathAsStr.length ? pathAsStr.split(',').map((x) => parseInt(x)) : []; // convert the stringified board to a list of ints
        return new State(board, Math.sqrt(board.length), parseFloat(g), parseFloat(h), path, Heuristics.stringToHeuristic(heuristic));
    }
    isSolvable() {
        let inversions = 0;
        for (let i = 0; i < this.boardLength; i++) {
            for (let j = i + 1; j < this.boardLength; j++) {
                if (this.board[i] != 0 && this.board[j] != 0 && this.board[i] > this.board[j]) {
                    inversions++;
                }
            }
        }
        if (this.width % 2 == 0) {
            let row = this.board.indexOf(0) / this.width;
            if (row % 2 == 0) {
                return inversions % 2 == 0;
            }
            else {
                return inversions % 2 == 1;
            }
        }
        else {
            return inversions % 2 == 0;
        }
    }
}
