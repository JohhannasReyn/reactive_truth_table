import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TruthTable from "../src/components/TruthTable";
import '@testing-library/jest-dom'

describe("<TruthTable>", () => {
  it("renders headers", () => {
    render(<TruthTable expression="a && b" />);

    expect(screen.getByText("a")).toBeInTheDocument();
    expect(screen.getByText("b")).toBeInTheDocument();
    expect(screen.getByText("Result")).toBeInTheDocument();
  });
});