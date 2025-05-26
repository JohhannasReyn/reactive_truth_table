import { describe, it, expect } from "vitest";
import { generateTruthTable } from "../src/lib/truthUtils";

const sig = (rows: { A: boolean; B: boolean; result: boolean }[]) =>
  rows.map((r) => `${+r.A}${+r.B}${+r.result}`).join("");

describe("operator/alias equivalence", () => {
  const pairs = [
    ["a && b", "a and b"],
    ["a && b", "a & b"],
    ["a && b", "a but b"],
    ["a || b", "a or b"],
    ["a || b", "a ∨ b"],
    ["!a"    , "not a" ],
    ["!a"    , "¬a"    ],
    ["(!a || b)", "a → b"],
    ["a == b", "a equals b"],
    ["a ^ b", "a ⊻ b"]
  ];

  pairs.forEach(([canonical, alias]) =>
    it(`"${alias}" behaves like "${canonical}"`, () => {
      const base  = sig(generateTruthTable(canonical).rows);
      const other = sig(generateTruthTable(alias).rows);
      expect(other).toBe(base);
    })
  );

  it("NAND symbol ⊼ works", () => {
    const { rows }: { rows: { result: boolean }[] } = generateTruthTable("a ⊼ b");
    expect(rows.map(r => r.result)).toEqual([true, true, true, false]);
  });
});
