import { describe, it, expect, vi } from "vitest";
import { DiagramService } from "./diagramService";

describe("DiagramService", () => {
  const mockEngine = {
    getCapabilities: vi.fn(() => ({ canExport: true, editable: true })),
    mount: vi.fn(),
    destroy: vi.fn(),
    exportDiagram: vi.fn(() => Promise.resolve("<xml></xml>")),
    exportImage: vi.fn(() => Promise.resolve("data:image/png;base64,abc123")),
  };

  it("should construct and call engine methods", () => {
    const service = new DiagramService(mockEngine);
    expect(service.getCapabilities()).toEqual({
      canExport: true,
      editable: true,
    });
    service.mount(document.createElement("div"));
    expect(mockEngine.mount).toHaveBeenCalled();
    service.destroy();
    expect(mockEngine.destroy).toHaveBeenCalled();
    return Promise.all([
      service.exportDiagram().then((result) => {
        expect(result).toBe("<xml></xml>");
      }),
      service.exportImage().then((img) => {
        expect(img).toBe("data:image/png;base64,abc123");
      }),
    ]);
  });

  it("should call engine methods with correct arguments", () => {
    const service = new DiagramService(mockEngine);
    const el = document.createElement("div");
    service.mount(el);
    expect(mockEngine.mount).toHaveBeenCalledWith(el);
  });
});
