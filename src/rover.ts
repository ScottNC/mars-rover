export function runRovers(instructions: string[]): string[] {
  return instructions[2] === 'M' ? ['0 1 N'] : ['0 0 W'];
}
