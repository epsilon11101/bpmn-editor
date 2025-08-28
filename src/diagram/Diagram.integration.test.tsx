import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { DiagramProvider } from "./DiagramProvider";
import DiagramComponent from "./DiagramComponent";
import "@testing-library/jest-dom";
// Mock getBBox to avoid SVG errors in jsdom
beforeAll(() => {
  // @ts-expect-error ignore error
  window.SVGElement.prototype.getBBox = () => ({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
});

describe("Diagram integration", () => {
  it("renders DiagramProvider and DiagramComponent correctly", () => {
    render(
      <DiagramProvider>
        <DiagramComponent />
      </DiagramProvider>
    );
    // Check that the main menu is present
    expect(screen.getByText(/Descargar|Opciones BPMN/i)).toBeInTheDocument();
  });
});
