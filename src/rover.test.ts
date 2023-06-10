import { runRovers } from "./rover";
describe("runRovers", () => {
  it("should move 1 step north", () => {
    expect(runRovers(['1 1', '0 0 N', 'M'])).toEqual(['0 1 N']);
  });

  it("should turn left", () => {
    expect(runRovers(['1 1', '0 0 N', 'L'])).toEqual(['0 0 W']);
  });

  it("should turn right", () => {
    expect(runRovers(['1 1', '0 0 N', 'R'])).toEqual(['0 0 E']);
  });
});
