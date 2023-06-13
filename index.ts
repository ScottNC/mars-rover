import { runRovers, GridString, Rovers } from './src/rover';
import { convertGridToArray, convertPositionToArray, Position } from './src/convert_to_array';
import * as readline from 'node:readline';

let rovers: Rovers = [];
let roverCount: number;
let roverIteration: number = 0;
let gridStr: GridString;
let currentPosition: Position;

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
    rovers.push([currentPosition, instruction]);

  if (roverIteration > roverCount) {
    console.log('--------------------');
    runRovers(gridStr, rovers).forEach((position) => console.log(position));
    console.log('--------------------');
    return askAgain();
  }

  return reader.question(`What is the starting position of rover ${roverIteration.toString()}?\n`, askInstructions);

}

function askInstructions(position: string) {
  if (convertPositionToArray(position) === null)
    return reader.question(`What is the starting position of rover ${roverIteration.toString()}? (Please give answer such as 3 3 N)\n`, askInstructions);

  currentPosition = position as Position;
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


