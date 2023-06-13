import { convertPositionToArray, CardinalDirections, Grid, Position } from "./convert_to_array";

export type PositionAsArray = [number, number, CardinalDirections];
export type ArrayOfPositions = (Position | null)[];

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

export function drive(x: number, y: number, direction: CardinalDirections, grid: Grid, otherRovers: ArrayOfPositions) {
  const [newX, newY] : [number, number] = MOVES[direction](x, y);
  return isInvalidMove(newX, newY, grid, otherRovers) ? [x, y] : [newX, newY];
}

function checkCollision(newX: number, newY: number, otherRovers: ArrayOfPositions) {
  return otherRovers.some((rover: Position | null) => {
    if (rover === null) return false;

    const roverArray: PositionAsArray = convertPositionToArray(rover) as PositionAsArray;

    return newX === roverArray[0] && newY === roverArray[1];
  });
}

function isInvalidMove(newX: number, newY: number, grid: Grid, otherRovers: ArrayOfPositions) {
  return newX < 0 || newY < 0 || newX > grid[0] || newY > grid[1] || checkCollision(newX, newY, otherRovers);
}
