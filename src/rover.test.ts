import { runRovers } from "./rover";
describe("runRovers", () => {
  it("should move 1 step north", () => {
    expect(runRovers(['1 1', '0 0 N', 'M'])).toEqual(['0 1 N']);
  });

  it("should turn left and right in all directions", () => {
    expect(runRovers(['1 1', '0 0 N', 'L'])).toEqual(['0 0 W']);
    expect(runRovers(['1 1', '0 0 W', 'L'])).toEqual(['0 0 S']);
    expect(runRovers(['1 1', '0 0 S', 'L'])).toEqual(['0 0 E']);
    expect(runRovers(['1 1', '0 0 E', 'L'])).toEqual(['0 0 N']);
    expect(runRovers(['1 1', '0 0 N', 'R'])).toEqual(['0 0 E']);
    expect(runRovers(['1 1', '0 0 E', 'R'])).toEqual(['0 0 S']);
    expect(runRovers(['1 1', '0 0 S', 'R'])).toEqual(['0 0 W']);
    expect(runRovers(['1 1', '0 0 W', 'R'])).toEqual(['0 0 N']);
  });

  it("should be able to turn multiple times", () => {
    expect(runRovers(['1 1', '0 0 N', 'LL'])).toEqual(['0 0 S']);
    expect(runRovers(['1 1', '0 0 S', 'RL'])).toEqual(['0 0 S']);
    expect(runRovers(['1 1', '0 0 E', 'LLLL'])).toEqual(['0 0 E']);
    expect(runRovers(['1 1', '0 0 E', 'RRRL'])).toEqual(['0 0 W']);
  })
});
