import { runRovers, GridString } from './src/rover';
import { convertGridToArray } from './src/convert_to_array';
import * as readline from 'node:readline';

let input: string[] = [];
let roverCount: number;
let roverIteration: number = 0;
let gridStr: GridString;

const reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
  terminal: false
});

function roverFromUserInput() {
  console.log('Welcome to Mars!');
  return reader.question('How many rovers would you like?\n', askGrid);
}

function askGrid(roverCountString: string) {
  roverCount = parseInt(roverCountString);

  if (isNaN(roverCount)) return reader.question('How many rovers would you like? (Please give a number)\n', askGrid);

  return reader.question('What are the dimensions of your grid?\n', askRoverInput)
}

function askRoverInput(answer: string) {
  
  const gridArray: (number[] | null) = convertGridToArray(answer);
  if (gridArray === null) return reader.question('What are the dimensions of your grid? (Please give 2 numbers)\n', askRoverInput)

  gridStr = answer as GridString;
  return askPosition(null);
}

function askPosition(instruction: string | null) {
  roverIteration++;

  if (instruction !== null) 
    input.push(instruction);

  if (roverIteration > roverCount) {
    console.log('--------------------');
    runRovers([gridStr, ...input]).forEach((position) => console.log(position));
    console.log('--------------------');
    return askAgain();
  }

  return reader.question(`What is the starting position of rover ${roverIteration.toString()}?\n`, askInstructions);

}

function askInstructions(position: string) {
  input.push(position)
  return reader.question(`What instructions are you giving rover ${roverIteration.toString()}?\n`, askPosition);
}

function askAgain() {
  return reader.question('Would you like to go again? (answer Y or N)\n', goAgain)
}

function goAgain(answer: string) {
  switch (answer) {
    case 'Y':
      console.log('--------------------');
      return roverFromUserInput();
    case 'N':
      return process.exit(1);
    default:
      return askAgain();
  }
}

roverFromUserInput();


