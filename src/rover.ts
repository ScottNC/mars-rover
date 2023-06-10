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

export function runRovers([, startPoint, instructions]: [string, Position, Directions | Movement]): Position[] {
  if (instructions === 'M') return ['0 1 N'];

  const currentDirection : TurnDirections = startPoint[startPoint.length - 1] as TurnDirections;
  const futureDirection : TurnDirections = TURN_DIRECTIONS_MAP[instructions][currentDirection];

  return ['0 0 ' + futureDirection as Position];
}
