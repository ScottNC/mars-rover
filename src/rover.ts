import { isInstruction, convertPositionToArray, ALL_DIRECTIONS, ONLY_MOVEMENT } from "./type_checks";
import { drive, CardinalDirections, Grid, Position, PositionAsArray, ArrayOfPositions } from "./reposition_rover";

type Direction = typeof ALL_DIRECTIONS[number];
type Movement = typeof ONLY_MOVEMENT;
type Instruction = Movement | Direction;

type CardinalDirectionMap = {
  [key in Direction]: {[key in CardinalDirections] : CardinalDirections};
};

type GridString = `${number} ${number}`

const CARDINAL_DIRECTIONS_MAP: CardinalDirectionMap = {
  R : {
    N: 'E',
    E: 'S',
    S: 'W',
    W: 'N'
  },
  L : {
    N: 'W',
    W: 'S',
    S: 'E',
    E: 'N'
  }
} as const;

export function runRovers([gridString, ...args]: [GridString, ...string[]]) {
  const evenNumbers: number[] = Array.from({ length: args.length / 2 }, (_, i) => 2 * i);

  const grid: Grid = gridString.split(' ').map(a => parseInt(a)) as Grid;

  const newPositions: ArrayOfPositions = [];

  return evenNumbers.reduce((newPositions, index) => {
    try {
      newPositions.push(runSingleRover(grid, args[index] as Position, args[index + 1], newPositions));
      return newPositions;
    } catch (e) {
      newPositions.push(null);
      return newPositions;
    }
  }, newPositions);
}

function runSingleRover(grid: Grid, startPoint: Position, instructions: string, otherRovers: ArrayOfPositions) {
  const allInstructions: Instruction[] = instructions.split('');

  if (!isInstruction(allInstructions)) throw new Error("Instructions must only include M, L or R");

  return allInstructions.reduce((position: Position, instruction: Instruction) => moveRover(grid, position, instruction, otherRovers), startPoint);
}

function moveRover(grid: Grid, position: Position, instruction: Instruction, otherRovers: ArrayOfPositions) {

  let [xPosition, yPosition, direction] : PositionAsArray = convertPositionToArray(position) as PositionAsArray;

  if (instruction === ONLY_MOVEMENT)
    [xPosition, yPosition] = drive(xPosition, yPosition, direction, grid, otherRovers);
  else
    direction = CARDINAL_DIRECTIONS_MAP[instruction][direction];

  return [xPosition.toString(), yPosition.toString(), direction].join(' ') as Position;
}
