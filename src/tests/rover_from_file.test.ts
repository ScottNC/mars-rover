import { runRoversFromFile } from "../run_from_file/rover_from_file";
import * as fs from 'fs';
import * as tmp from 'tmp';

describe('runRoversFromFile', () => {
  let tempFilePath: string;

  function compareOutput(output: string) {
    expect(fs.readFileSync(tempFilePath).toString('utf-8')).toBe(fs.readFileSync(output).toString('utf-8'))
  }

  beforeEach(() => {
    const tempFile = tmp.fileSync();
    tempFilePath = tempFile.name;
  });

  afterEach(() => {
    fs.unlinkSync(tempFilePath);
  });

  it('should be able to output a file with the correct coordinates', async () => {
    runRoversFromFile('src/tests/input_test/input_test1.txt', tempFilePath)
    compareOutput('src/tests/output_test/output_test1.txt')
  })

  it('should be able to output a file with an empty line for invalid input', async () => {
    runRoversFromFile('src/tests/input_test/input_test2.txt', tempFilePath)
    compareOutput('src/tests/output_test/output_test2.txt')
  })

  it('should be able to output a file with an empty line for invalid grid', async () => {
    runRoversFromFile('src/tests/input_test/input_test3.txt', tempFilePath)
    compareOutput('src/tests/output_test/output_test3.txt')
  })

  it('should be able to output a file when inputting empty line at the end', async () => {
    runRoversFromFile('src/tests/input_test/input_test4.txt', tempFilePath)
    compareOutput('src/tests/output_test/output_test4.txt')
  })
});