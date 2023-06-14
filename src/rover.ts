import { 
  convertInstructionsToArray,
  convertPositionToArray,
  Instruction,
  Grid,
  Position,
  PositionAsArray,
  ArrayOfPositions,
  ONLY_MOVEMENT,
  convertGridToArray,
  convertPositionToString
} from "./convert_types";

import { drive, isInvalidMove } from "./drive_rover";
import { rotate } from "./rotate_rover";

export type GridString = `${number} ${number}`;
export type Rovers = [Position, string][]

export function runRovers(gridString: GridString, rovers: Rovers) {

  const grid: (Grid | null) = convertGridToArray(gridString);

  const newPositions: ArrayOfPositions = [];

  const oldPositions: ArrayOfPositions = rovers.map(rover => rover[0]);

  return rovers.reduce((newPositions, rover, index) => {
    try {

      // useful for inputting from a text file
      if (grid === null) throw new Error("Grid must be 2 numbers");

      const posArr: PositionAsArray = convertPositionToArray(rover[0]) as PositionAsArray;

      // checks if initial positions is outside grid or the same as previous initial positions
      if (isInvalidMove(posArr[0], posArr[1], grid, oldPositions.slice(0, index)))
        throw new Error("cannot start rover outside grid");

      newPositions.push(convertPositionToString(runSingleRover(grid, posArr, rover[1], [...newPositions, ...oldPositions.slice(index + 1)])));
      return newPositions;
    } catch (e) {

      // if any errors happen the code we will add null so other rovers can make thier movements
      newPositions.push(null);
      return newPositions;
    }
  }, newPositions);
}

function runSingleRover(grid: Grid, startPoint: PositionAsArray, instructions: string, otherRovers: ArrayOfPositions) {
  const allInstructions: (Instruction[] | null) = convertInstructionsToArray(instructions);

  if (allInstructions === null)
    throw new Error("Instructions must only include M, L or R");
    
  return allInstructions.reduce((position: PositionAsArray, instruction: Instruction) => moveRover(grid, position, instruction, otherRovers), startPoint);
}

function moveRover(grid: Grid, position: PositionAsArray, instruction: Instruction, otherRovers: ArrayOfPositions) {

  let [xPosition, yPosition, direction] : PositionAsArray = position;

  if (instruction === ONLY_MOVEMENT)
    [xPosition, yPosition] = drive(xPosition, yPosition, direction, grid, otherRovers);
  else
    direction = rotate(instruction, direction);

  return [xPosition, yPosition, direction] as PositionAsArray;
}
