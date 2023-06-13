import { Direction, CardinalDirections } from "./convert_types";

type CardinalDirectionMap = {
  [key in Direction]: {[key in CardinalDirections] : CardinalDirections};
};

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

export function rotate(instruction: Direction, direction: CardinalDirections) {
  return CARDINAL_DIRECTIONS_MAP[instruction][direction];
}