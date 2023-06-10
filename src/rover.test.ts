import { runRovers } from "./rover";
describe("runRovers", () => {
  it("should return 15 for add(10,5)", () => {
    expect(runRovers(['1 1', '0 0 N', 'M'])).toEqual(['0 1 N']);
  });
});
