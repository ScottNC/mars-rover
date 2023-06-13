import { convertInstructionsToArray, convertPositionToArray, Instruction, Grid, Position, ONLY_MOVEMENT, convertGridToArray } from "./convert_to_array";
import { drive, PositionAsArray, ArrayOfPositions } from "./drive_rover";
import { rotate } from "./rotate_rover";

export type GridString = `${number} ${number}`;
export type Rovers = [Position, string][]

export function runRovers(gridString: GridString, rovers: Rovers) {

  const grid: (Grid | null) = convertGridToArray(gridString) || null;

  const newPositions: ArrayOfPositions = [];

  const oldPositions: ArrayOfPositions = rovers.map(rover => rover[0]);

  return rovers.reduce((newPositions, rover, index) => {
    try {
      if (grid === null) throw new Error("Grid must be 2 numbers");

      if (oldPositions.slice(0, index).some((otherRover: Position | null) => otherRover && otherRover.slice(0, -1) === rover[0].slice(0, -1)))
        throw new Error("multiple rovers cannot stat in the same place");

      newPositions.push(runSingleRover(grid, rover[0], rover[1], [...newPositions || [], ...oldPositions.slice(index + 1) || []]));
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
