import { generateTruthTable } from "../src/lib/parser";
import { describe, it, expect } from "vitest";

describe("parser", () => {
  it("handles NOT / AND / OR", () => {
    const { rows } = generateTruthTable("not A and (B or C)");
    expect(rows).toHaveLength(8);
    expect(rows[0]).toEqual({ A: false, B: false, C: false, result: false });
  });
});
