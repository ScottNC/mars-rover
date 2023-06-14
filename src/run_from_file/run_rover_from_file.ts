import { runRoversFromFile } from './rover_from_file'

const inputFile = process.argv[2];
const outputFile = process.argv[3];

runRoversFromFile(inputFile, outputFile);