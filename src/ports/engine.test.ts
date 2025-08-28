import { describe, it, expect, vi, beforeEach } from "vitest";
import { createBpmnModelerEngine } from "./engine";

// Mock BpmnModeler and its methods
const importXMLMock = vi.fn();
const destroyMock = vi.fn();
const saveXMLMock = vi.fn(() => Promise.resolve({ xml: "<xml></xml>" }));
const saveSVGMock = vi.fn(() => Promise.resolve({ svg: "<svg></svg>" }));

vi.mock("bpmn-js/lib/Modeler", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      importXML: importXMLMock,
      destroy: destroyMock,
      saveXML: saveXMLMock,
      saveSVG: saveSVGMock,
    })),
  };
});

describe("diagramEngine", () => {
  beforeEach(() => {
    importXMLMock.mockClear();
    destroyMock.mockClear();
    saveXMLMock.mockClear();
    saveSVGMock.mockClear();
  });

  it("mounts and imports XML", async () => {
    const engine = createBpmnModelerEngine({});
    await engine.mount(document.createElement("div"));
    expect(importXMLMock).toHaveBeenCalled();
  });

  it("destroys the modeler", async () => {
    const engine = createBpmnModelerEngine({});
    await engine.mount(document.createElement("div"));
    engine.destroy();
    expect(destroyMock).toHaveBeenCalled();
  });

  it("returns capabilities", () => {
    const engine = createBpmnModelerEngine({});
    expect(engine.getCapabilities()).toEqual({ editable: true });
  });

  it("exports diagram XML", async () => {
    const engine = createBpmnModelerEngine({});
    await engine.mount(document.createElement("div"));
    const xml = await engine.exportDiagram();
    expect(xml).toBe("<xml></xml>");
  });

  it("exports diagram SVG", async () => {
    const engine = createBpmnModelerEngine({});
    await engine.mount(document.createElement("div"));
    const svg = await engine.exportImage();
    expect(svg).toBe("<svg></svg>");
  });
});
