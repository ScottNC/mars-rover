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

export function runRovers([, startPoint, instructions]: [string, Position, string]): Position[] {
  const allInstructions: Instructions[] = instructions.split('') as Instructions[];
  let [xPositionString, yPositionString, direction] : [string, string, TurnDirections] = startPoint.split(' ') as [`${number}`, `${number}`, TurnDirections];
  let yPosition = parseInt(yPositionString);

  allInstructions.forEach((instruction: Instructions) => {
    if (isDirection(instruction))
      direction  = TURN_DIRECTIONS_MAP[instruction as Directions][direction];
    else {
      yPosition ++;
    }
  })

  return [[xPositionString, yPosition.toString(), direction].join(' ') as Position];
}

function isDirection(instruction : string) {
  return ['L', 'R'].includes(instruction);
}
