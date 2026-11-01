import { describe, it, expect } from "vitest";
import { scoreFor, labelFor, missingNumbers } from "./checker";

describe("checker rules", () => {
  it("each yes is 20 points", () => {
    expect(scoreFor(["yes", "yes", "no", "yes", "no"])).toBe(60);
  });
  it("labels by score", () => {
    expect(labelFor(100).text).toBe("Ready to go");
    expect(labelFor(80).text).toBe("Almost there");
    expect(labelFor(60).text).toBe("Almost there");
    expect(labelFor(40).text).toBe("Needs rework");
    expect(labelFor(0).text).toBe("Needs rework");
  });
  it("lists missing question numbers", () => {
    expect(missingNumbers(["yes", undefined, "no", undefined, "yes"])).toEqual([2, 4]);
  });
});
