export const ALL_DIRECTIONS = ['L', 'R'];
export const ONLY_MOVEMENT = 'M';
export const CARDINALS = ['N', 'E', 'S', 'W']

export function isInstruction(instructions: string[]) {
  return instructions.every(a => [...ALL_DIRECTIONS, ONLY_MOVEMENT].includes(a));
}

export function convertPositionToArray(position: string) {
  const positionAsArray = position.split(' ');
  if (positionAsArray.length !== 3) throw new Error("starting position must be in the form 'number number cardinalDirection'");

  const xPosition: number = parseInt(positionAsArray[0]);
  const yPosition: number = parseInt(positionAsArray[1]);

  if (isNaN(xPosition + yPosition)) throw new Error("starting position must be in the form 'number number cardinalDirection'");

  const direction = positionAsArray[2];

  if (!CARDINALS.includes(direction)) throw new Error("starting position must be in the form 'number number cardinalDirection'");

  return [xPosition, yPosition, direction];
}