# n-puzzle-solver-typescript

## Purpose
Tool that can solve random or given n-puzzles (n=8, 15, 24...) using the **A\* search algorithm** and return stats on the solutions.

This is a Typescript port of it's [python based sibling](https://github.com/SamsonGoodenough/8-puzzle-solver) for python's lack of cumputing speads when dealing with large amounts of memory.

## Heuristics
- Displacement
- Manhattan Distance
- Out Of Row Coloumn
- Linear Conflict
- Euclidean

## Usage
1. Clone the repository and install [NodeJS](https://nodejs.org/en/download/)
2. Run `npm install` to install dependencies
3. Run `node ./build/index.js` to execute program
4. Make any changes to `index.ts` and run `tsc` to build them

## License
MIT © License can be found [here](https://github.com/SamsonGoodenough/n-puzzle-solver-typescript/blob/main/LICENSE).
