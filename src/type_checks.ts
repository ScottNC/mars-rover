export const ALL_DIRECTIONS = ['L', 'R'];
export const ONLY_MOVEMENT = 'M';
export const CARDINALS = ['N', 'E', 'S', 'W']

export function isInstruction(instructions: string[]) {
  return instructions.every(a => [...ALL_DIRECTIONS, ONLY_MOVEMENT].includes(a));
}

export function convertPositionToArray(position: string) {
  const positionArray = position.split(' ');
  if (positionArray.length !== 3) throw new Error("starting position must be in the form 'number number cardinalDirection'");

  const xPosition: number = parseInt(positionArray[0]);
  const yPosition: number = parseInt(positionArray[1]);

  if (isNaN(xPosition + yPosition)) throw new Error("starting position must be in the form 'number number cardinalDirection'");

  const direction = positionArray[2];

  if (!CARDINALS.includes(direction)) throw new Error("starting position must be in the form 'number number cardinalDirection'");

  return [xPosition, yPosition, direction];
}