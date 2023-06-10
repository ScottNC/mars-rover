type Direction = 'L' | 'R';
type Movement = 'M';
type Instruction = Movement | Direction;

type CardinalDirections = 'N' | 'E' | 'S' | 'W';

type CardinalDirectionMap = {
  [key in Direction]: {[key in CardinalDirections] : CardinalDirections};
};

type Position = `${number} ${number} ${CardinalDirections}`;
type PositionArray = [`${number}`, `${number}`, CardinalDirections];

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

export function runRovers([, startPoint, instructions]: [string, Position, string]) {
  const allInstructions: Instruction[] = instructions.split('') as Instruction[];

  return [allInstructions.reduce(moveRover, startPoint)];
}

function moveRover(position: Position, instruction: Instruction) {

  let [xPositionString, yPositionString, direction] : PositionArray = position.split(' ') as PositionArray;
  
  let yPosition: number = parseInt(yPositionString);
  let xPosition: number = parseInt(xPositionString);

  if (instruction === 'M')
    [xPosition, yPosition] = MOVES[direction](xPosition, yPosition);
  else
    direction = CARDINAL_DIRECTIONS_MAP[instruction][direction];

  return [xPosition.toString(), yPosition.toString(), direction].join(' ') as Position;
}
