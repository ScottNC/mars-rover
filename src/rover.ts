import { isInstruction, convertPositionToArray, ALL_DIRECTIONS, ONLY_MOVEMENT, CARDINALS } from "./type_checks";

type Direction = typeof ALL_DIRECTIONS[number];
type Movement = typeof ONLY_MOVEMENT;
type Instruction = Movement | Direction;

type CardinalDirections = typeof CARDINALS[number];

type CardinalDirectionMap = {
  [key in Direction]: {[key in CardinalDirections] : CardinalDirections};
};

type Position = `${number} ${number} ${CardinalDirections}`;
type PositionArray = [number, number, CardinalDirections];
type ArrayOfPositions = (Position | null)[];

type GridString = `${number} ${number}`
type Grid = [number, number];

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

const north = (x: number, y: number) => [x, y + 1];
const south = (x: number, y: number) => [x, y - 1];
const east = (x: number, y: number) => [x + 1, y];
const west = (x: number, y: number) => [x - 1, y];

type MoveFunctions = {[key in CardinalDirections] : Function};

const MOVES : MoveFunctions = {
  N: north,
  E: east,
  S: south,
  W: west
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

  let [xPosition, yPosition, direction] : PositionArray = convertPositionToArray(position) as PositionArray;

  if (instruction === ONLY_MOVEMENT) {
    const [newX, newY] = reposition(xPosition, yPosition, direction, grid);
    [xPosition, yPosition] = checkCollision(newX, newY, otherRovers) ? [xPosition, yPosition] : [newX, newY];
  } else
    direction = CARDINAL_DIRECTIONS_MAP[instruction][direction];

  return [xPosition.toString(), yPosition.toString(), direction].join(' ') as Position;
}

function checkCollision(newX: number, newY: number, otherRovers: ArrayOfPositions) {
  return otherRovers.some((rover: Position | null) => {
    if (rover === null) return false;

    const roverArray: PositionArray = convertPositionToArray(rover) as PositionArray;

    return newX === roverArray[0] && newY === roverArray[1];
  });
}

function keepInBound(coordinate: number, maxBound: number) {
  if (coordinate <= 0)
    return 0;

  return coordinate >= maxBound ? maxBound : coordinate;
}

function reposition(x: number, y: number, direction: CardinalDirections, grid: Grid) {
  return MOVES[direction](x, y).map((coordinate: number, idx: 0 | 1) => keepInBound(coordinate, grid[idx]));
}
