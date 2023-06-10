type Directions = 'L' | 'R';
type Movement = 'M';
type Instructions = Movement | Directions;

type TurnDirections = 'N' | 'E' | 'S' | 'W';

type TurnDirectionMap = {
  [key in Directions]: {[key in TurnDirections] : TurnDirections};
};

type Position = `${number} ${number} ${TurnDirections}`;

const TURN_DIRECTIONS_MAP: TurnDirectionMap = {
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

type TurnFunctions = {[key in TurnDirections] : Function};

const TURNS : TurnFunctions = {
  N: north,
  E: east,
  S: south,
  W: west
} as const;

export function runRovers([, startPoint, instructions]: [string, Position, string]): Position[] {
  const allInstructions: Instructions[] = instructions.split('') as Instructions[];
  let [xPositionString, yPositionString, direction] : [string, string, TurnDirections] = startPoint.split(' ') as [`${number}`, `${number}`, TurnDirections];
  let yPosition: number = parseInt(yPositionString);
  let xPosition: number = parseInt(xPositionString);

  allInstructions.forEach((instruction: Instructions) => {
    if (instruction === 'M')
      [xPosition, yPosition] = TURNS[direction](xPosition, yPosition);
    else
      direction  = TURN_DIRECTIONS_MAP[instruction as Directions][direction];
  })

  return [[xPosition.toString(), yPosition.toString(), direction].join(' ') as Position];
}
