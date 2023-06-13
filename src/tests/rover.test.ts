import { runRovers } from "../rover";
describe("runRovers", () => {
  it("should move 1 step north", () => {
    expect(runRovers('1 1', [['0 0 N', 'M']])).toEqual(['0 1 N']);
  });

  it("should move multiple steps north", () => {
    expect(runRovers('3 3', [['0 0 N', 'MMM']])).toEqual(['0 3 N']);
    expect(runRovers('8 8', [['0 3 N', 'MMMMM']])).toEqual(['0 8 N']);
  });

  it("should move multiple steps south", () => {
    expect(runRovers('3 3', [['0 1 S', 'M']])).toEqual(['0 0 S']);
    expect(runRovers('8 8', [['0 7 S', 'MMM']])).toEqual(['0 4 S']);
    expect(runRovers('8 8', [['0 8 S', 'MMMMMMM']])).toEqual(['0 1 S']);
  });

  it("should move multiple steps east and west", () => {
    expect(runRovers('3 3', [['0 1 E', 'M']])).toEqual(['1 1 E']);
    expect(runRovers('8 8', [['4 7 E', 'MMM']])).toEqual(['7 7 E']);
    expect(runRovers('8 8', [['0 8 E', 'MMMMMMM']])).toEqual(['7 8 E']);
    expect(runRovers('3 3', [['3 1 W', 'M']])).toEqual(['2 1 W']);
    expect(runRovers('8 8', [['4 7 W', 'MMM']])).toEqual(['1 7 W']);
    expect(runRovers('8 8', [['8 8 W', 'MMMMMMM']])).toEqual(['1 8 W']);
  });

  it("should turn left and right in all directions", () => {
    expect(runRovers('1 1', [['0 0 N', 'L']])).toEqual(['0 0 W']);
    expect(runRovers('1 1', [['0 0 W', 'L']])).toEqual(['0 0 S']);
    expect(runRovers('1 1', [['0 0 S', 'L']])).toEqual(['0 0 E']);
    expect(runRovers('1 1', [['0 0 E', 'L']])).toEqual(['0 0 N']);
    expect(runRovers('1 1', [['0 0 N', 'R']])).toEqual(['0 0 E']);
    expect(runRovers('1 1', [['0 0 E', 'R']])).toEqual(['0 0 S']);
    expect(runRovers('1 1', [['0 0 S', 'R']])).toEqual(['0 0 W']);
    expect(runRovers('1 1', [['0 0 W', 'R']])).toEqual(['0 0 N']);
  });

  it("should be able to turn multiple times", () => {
    expect(runRovers('1 1', [['0 0 N', 'LL']])).toEqual(['0 0 S']);
    expect(runRovers('1 1', [['0 0 S', 'RL']])).toEqual(['0 0 S']);
    expect(runRovers('1 1', [['0 0 E', 'LLLL']])).toEqual(['0 0 E']);
    expect(runRovers('1 1', [['0 0 E', 'RRRL']])).toEqual(['0 0 W']);
  })

  it("should be able turn on any location", () => {
    expect(runRovers('5 5', [['4 4 N', 'LL']])).toEqual(['4 4 S']);
    expect(runRovers('5 5', [['2 3 N', 'R']])).toEqual(['2 3 E']);
  })

  it("should be to make turns and steps", () => {
    expect(runRovers('5 5', [['4 4 N', 'LMLM']])).toEqual(['3 3 S']);
    expect(runRovers('5 5', [['2 0 E', 'MMLMMRM']])).toEqual(['5 2 E']);
    expect(runRovers('5 5', [['1 2 N', 'LMLMLMLMM']])).toEqual(['1 3 N']);
    expect(runRovers('5 5', [['3 3 E', 'MMRMMRMRRM']])).toEqual(['5 1 E']);
  })

  it("should return null if instructions contain other characters", () => {
    expect( runRovers('3 3', [['0 0 N', 'MDM']])).toEqual([null]);
  });

  it("should not be able to travel out of bounds", () => {
    expect(runRovers('4 4', [['0 0 S', 'M']])).toEqual(['0 0 S']);
    expect(runRovers('4 4', [['0 0 W', 'M']])).toEqual(['0 0 W']);
    expect(runRovers('4 4', [['0 4 N', 'M']])).toEqual(['0 4 N']);
    expect(runRovers('4 4', [['4 0 E', 'M']])).toEqual(['4 0 E']);
  });

  it("should carry on moving after hitting boundary", () => {
    expect(runRovers('3 3', [['2 2 N', 'MMMMLMLMM']])).toEqual(['1 1 S']);
  });

  it("should move two rovers", () => {
    expect(runRovers('5 5', [['0 0 N', 'M'], ['5 5 W', 'MLM']])).toEqual(['0 1 N', '4 4 S']);
  });

  it("should move one rover when two are inputted but one doesn't match the instructions", () => {
    expect(runRovers('5 5', [['0 0 N', 'M'], ['5 5 W', 'hello']])).toEqual(['0 1 N', null]);
  });

  it("should not allow the rover to move if it's going to crash with another rover", () => {
    expect(runRovers('5 5', [['0 0 N', 'M'], ['0 2 S', 'M']])).toEqual(['0 1 N', '0 2 S']);
  });

  it("should continue driving if it was about to crash", () => {
    expect(runRovers('5 5', [['0 0 N', 'M'], ['0 2 S', 'MLM']])).toEqual(['0 1 N', '1 2 E']);
  });

  it("should not crash into rover that hasn't moved yet", () => {
    expect(runRovers('5 5', [['0 0 N', 'M'], ['0 1 E', 'M']])).toEqual(['0 0 N', '1 1 E']);
  });

  it("should not be able to place second rover in place of previous rover", () => {
    expect(runRovers('5 5', [['0 0 N', 'M'], ['0 0 E', 'M']])).toEqual(['0 1 N', null]);
  });

  it("should not be able to start outside the grid", () => {
    expect(runRovers('5 5', [['-1 0 N', 'M']])).toEqual([null]);
    expect(runRovers('5 5', [['0 -1 N', 'M']])).toEqual([null]);
    expect(runRovers('5 5', [['0 6 N', 'M']])).toEqual([null]);
    expect(runRovers('5 5', [['6 0 N', 'M']])).toEqual([null]);
  });
});
