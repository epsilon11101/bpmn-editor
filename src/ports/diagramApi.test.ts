import { describe, it, expect } from "vitest";
import type { Capabilities, DiagramApi, DiagramEngine } from "./diagramApi";

describe("diagramApi types and interfaces", () => {
  it("Capabilities type should have editable property", () => {
    const caps: Capabilities = { editable: true };
    expect(caps.editable).toBeTypeOf("boolean");
  });

  it("DiagramApi interface should define required methods", () => {
    const api: DiagramApi = {
      getCapabilities: () => ({ editable: true }),
      mount: async () => {},
      destroy: () => {},
      exportDiagram: async () => "<xml></xml>",
      exportImage: async () => "data:image/png;base64,abc123",
    };
    expect(api.getCapabilities()).toEqual({ editable: true });
    expect(api.mount).toBeInstanceOf(Function);
    expect(api.destroy).toBeInstanceOf(Function);
    expect(api.exportDiagram).toBeInstanceOf(Function);
    expect(api.exportImage).toBeInstanceOf(Function);
  });

  it("DiagramEngine type should be assignable from DiagramApi", () => {
    const engine: DiagramEngine = {
      getCapabilities: () => ({ editable: false }),
      mount: async () => {},
      destroy: () => {},
      exportDiagram: async () => "<xml></xml>",
      exportImage: async () => "data:image/png;base64,abc123",
    };
    expect(engine.getCapabilities().editable).toBeTypeOf("boolean");
  });
});
