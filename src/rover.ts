type Directions = 'L' | 'R';
type Movement = 'M';

type TurnDirections = 'N' | 'E' | 'S' | 'W';

type TurnDirectionMap = {
  [key in Directions]: {[key in TurnDirections] : TurnDirections};
};

type Position = `${string}${TurnDirections}`;

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
  const valid = [...instructions].every(a => isDirection(a));

  if (!valid) return ['0 1 N'];

  const allInstructions: Directions[] = instructions.split('') as Directions[];
  let futureDirection: TurnDirections = startPoint[startPoint.length - 1] as TurnDirections;

  allInstructions.forEach((instruction: Directions) => {
    futureDirection  = TURN_DIRECTIONS_MAP[instruction][futureDirection];
  })

  return [startPoint.slice(0, startPoint.length - 1) + futureDirection as Position];
}

function isDirection(instruction : string) {
  return ['L', 'R'].includes(instruction);
}
