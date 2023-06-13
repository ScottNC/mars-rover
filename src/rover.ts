import { convertInstructionsToArray, convertPositionToArray, Instruction, Grid, ONLY_MOVEMENT, convertGridToArray } from "./convert_to_array";
import { drive, Position, PositionAsArray, ArrayOfPositions } from "./drive_rover";
import { rotate } from "./rotate_rover";

export type GridString = `${number} ${number}`;

export function runRovers([gridString, ...args]: [GridString, ...string[]]) {
  const evenNumbers: number[] = Array.from({ length: args.length / 2 }, (_, i) => 2 * i);

  const grid: (Grid | null) = convertGridToArray(gridString) || null;

  const newPositions: ArrayOfPositions = [];

  return evenNumbers.reduce((newPositions, index) => {
    try {
      if (grid === null) throw new Error("Grid must be 2 numbers");
      newPositions.push(runSingleRover(grid, args[index] as Position, args[index + 1], newPositions));
      return newPositions;
    } catch (e) {
      newPositions.push(null);
      return newPositions;
    }
  }, newPositions);
}

function runSingleRover(grid: Grid, startPoint: Position, instructions: string, otherRovers: ArrayOfPositions) {
  const allInstructions: Instruction[] = convertInstructionsToArray(instructions);
  return allInstructions.reduce((position: Position, instruction: Instruction) => moveRover(grid, position, instruction, otherRovers), startPoint);
}

function moveRover(grid: Grid, position: Position, instruction: Instruction, otherRovers: ArrayOfPositions) {

  let [xPosition, yPosition, direction] : PositionAsArray = convertPositionToArray(position) as PositionAsArray;

  if (instruction === ONLY_MOVEMENT)
    [xPosition, yPosition] = drive(xPosition, yPosition, direction, grid, otherRovers);
  else
    direction = rotate(instruction, direction);

  return [xPosition.toString(), yPosition.toString(), direction].join(' ') as Position;
}
