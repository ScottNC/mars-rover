const ALL_DIRECTIONS = ['L', 'R'];
const ONLY_MOVEMENT = 'M';
const CARDINALS = ['N', 'E', 'S', 'W']

type Direction = typeof ALL_DIRECTIONS[number];
type Movement = typeof ONLY_MOVEMENT;
type Instruction = Movement | Direction;

type CardinalDirections = typeof CARDINALS[number];

type CardinalDirectionMap = {
  [key in Direction]: {[key in CardinalDirections] : CardinalDirections};
};

type Position = `${number} ${number} ${CardinalDirections}`;
type PositionArray = [number, number, CardinalDirections];

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
  const evenNumbers = Array.from({ length: args.length / 2 }, (_, i) => 2 * i);

  const grid: Grid = gridString.split(' ').map(a => parseInt(a)) as Grid;

  return evenNumbers.map(index => {
    try {
      return runSingleRover(grid, args[index] as Position, args[index + 1]);
    } catch (e) {
      return null;
    }
  });
}

function runSingleRover(grid: Grid, startPoint: Position, instructions: string) {
  const allInstructions: Instruction[] = instructions.split('') as Instruction[];

  if (!isInstruction(allInstructions)) throw new Error("Instructions must only include M, L or R");

  return allInstructions.reduce((position: Position, instruction: Instruction) => moveRover(grid, position, instruction), startPoint);
}

function moveRover(grid: Grid, position: Position, instruction: Instruction) {

  let [xPosition, yPosition, direction] : PositionArray = convertPositionToArray(position) as PositionArray;

  if (instruction === ONLY_MOVEMENT)
    [xPosition, yPosition] = reposition(xPosition, yPosition, direction, grid);
  else
    direction = CARDINAL_DIRECTIONS_MAP[instruction][direction];

  return [xPosition.toString(), yPosition.toString(), direction].join(' ') as Position;
}

function keepInBound(coordinate: number, maxBound: number) {
  return coordinate <= 0 ? 0 : coordinate >= maxBound ? maxBound : coordinate;
}

function reposition(x: number, y: number, direction: CardinalDirections, grid: Grid) {
  return MOVES[direction](x, y).map((coordinate: number, idx: 0 | 1) => keepInBound(coordinate, grid[idx]));
}

function isInstruction(instructions: string[]) {
  return instructions.every(a => [...ALL_DIRECTIONS, ONLY_MOVEMENT].includes(a));
}

function convertPositionToArray(position: string) {
  const positionArray = position.split(' ');
  if (positionArray.length !== 3) throw new Error("starting position must be in the form 'number number cardinalDirection'");

  const xPosition: number = parseInt(positionArray[0]);
  const yPosition: number = parseInt(positionArray[1]);

  if (isNaN(xPosition + yPosition)) throw new Error("starting position must be in the form 'number number cardinalDirection'");

  const direction = positionArray[2];

  if (!CARDINALS.includes(direction)) throw new Error("starting position must be in the form 'number number cardinalDirection'");

  return [xPosition, yPosition, direction];
}