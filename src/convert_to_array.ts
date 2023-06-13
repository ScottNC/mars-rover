export const ALL_DIRECTIONS = ['L', 'R'] as const;
export const ONLY_MOVEMENT = 'M' as const;
export const CARDINALS = ['N', 'E', 'S', 'W'] as const;

export type Direction = typeof ALL_DIRECTIONS[number];
export type Instruction = typeof ONLY_MOVEMENT | Direction;
export type CardinalDirections = typeof CARDINALS[number];

export type Grid = [number, number];

export function convertInstructionsToArray(instructions: string) {
  const allInstructions : string [] = instructions.split('');

  if (!allInstructions.every((a: string) => ([...ALL_DIRECTIONS, ONLY_MOVEMENT] as string[]).includes(a))) throw new Error("Instructions must only include M, L or R");

  return allInstructions as Instruction[];
}

export function convertPositionToArray(position: string) {
  const positionAsArray = position.split(' ');
  if (positionAsArray.length !== 3) throw new Error("starting position must be in the form 'number number cardinalDirection'");

  const xPosition: number = parseInt(positionAsArray[0]);
  const yPosition: number = parseInt(positionAsArray[1]);

  if (isNaN(xPosition + yPosition)) throw new Error("starting position must be in the form 'number number cardinalDirection'");

  const direction: string = positionAsArray[2];

  if (!([...CARDINALS] as string[]).includes(direction)) throw new Error("starting position must be in the form 'number number cardinalDirection'");

  return [xPosition, yPosition, direction as CardinalDirections];
}

export function convertGridToArray(gridString: string) {
  const output = gridString.split(' ').map(a => parseInt(a));

  if (output.length !== 2 || output.some(isNaN)) return null;

  return output as Grid;
}
