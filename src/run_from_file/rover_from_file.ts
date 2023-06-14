import { Position } from "../convert_types";
import { GridString, Rovers, runRovers } from "../rover";
import * as fs from 'fs';

export function runRoversFromFile(inputFilepath: string, outputFilepath: string) {
  const marsInfo: string[] = fs.readFileSync(inputFilepath).toString('utf-8').split('\r\n');

  const oddNumbers: number[] = Array.from({ length: (marsInfo.length - 1) / 2 }, (_, idx: number) => 2 * idx + 1);

  const roverInfo = oddNumbers.map(num => {
    const position = marsInfo[num];
    const instruction = marsInfo[num + 1]
    
    return [position as Position, instruction];
  });

  fs.writeFileSync(outputFilepath, runRovers(marsInfo[0] as GridString, roverInfo as Rovers).join('\r\n'), 'utf-8');
}
