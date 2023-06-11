const ALL_DIRECTIONS = ['L', 'R'];
const ONLY_MOVEMENT = 'M';

type Direction = typeof ALL_DIRECTIONS[number];
type Movement = typeof ONLY_MOVEMENT;
type Instruction = Movement | Direction;

type CardinalDirections = 'N' | 'E' | 'S' | 'W';

type CardinalDirectionMap = {
  [key in Direction]: {[key in CardinalDirections] : CardinalDirections};
};

type Position = `${number} ${number} ${CardinalDirections}`;
type PositionArray = [`${number}`, `${number}`, CardinalDirections];

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

export function runRovers([gridString, startPoint, instructions]: [GridString, Position, string]) {
  const allInstructions: Instruction[] = instructions.split('') as Instruction[];

  if (!allInstructions.every(a => [...ALL_DIRECTIONS, ONLY_MOVEMENT].includes(a))) throw new Error("Instructions must only include M, L or R");

  const grid: Grid = gridString.split(' ').map(a => parseInt(a)) as Grid;

  return [allInstructions.reduce((position: Position, instruction: Instruction) => moveRover(grid, position, instruction), startPoint)];
}

function moveRover(grid: Grid, position: Position, instruction: Instruction) {

  let [xPositionString, yPositionString, direction] : PositionArray = position.split(' ') as PositionArray;
  
  let yPosition: number = parseInt(yPositionString);
  let xPosition: number = parseInt(xPositionString);

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
