// create class that implements diagramengine
//create function that return bpmnengine
//Create singlenton to create only one bpmn engine

import type { ModdleExtension } from "bpmn-js/lib/BaseViewer";
import BpmnModeler from "bpmn-js/lib/Modeler";
import type { Capabilities, DiagramApi, DiagramEngine } from "./diagramApi";
import { normalizeXML } from "../utils/utils";

type EngineConfig = {
  // eslint-disable-next-line
  additionalModules?: any[];
  moddleExtensions?: Record<string, ModdleExtension>;
  taskResizingEnabled?: boolean;
  eventResizingEnabled?: boolean;
};

class diagramEngine implements DiagramApi {
  private modeler: BpmnModeler | null = null;
  private cfg: EngineConfig = {};
  constructor(cfg: EngineConfig) {
    this.cfg = cfg;
  }

  async mount(container) {
    if (this.modeler) return;
    this.modeler = new BpmnModeler({
      container: container,
      additionalModules: this.cfg?.additionalModules,
      moddleExtensions: this.cfg?.moddleExtensions || {},
      taskResizingEnabled: this.cfg?.moddleExtensions || false,
      eventResizingEnabled: this.cfg?.eventResizingEnabled || false,
    });
  }
  destroy() {
    try {
      this.modeler?.destroy?.();
    } finally {
      this.modeler = null;
    }
  }
  getCapabilities(): Capabilities {
    return { editable: true };
  }
  async exportDiagram() {
    const data = await this.modeler?.saveXML();
    const currentXML = normalizeXML(data?.xml);
    console.log(currentXML);
  }
  async exportImage() {
    const data = await this.modeler?.saveSVG();
    console.log(data);
  }
}

export function createBpmnModelerEngine(cfg: EngineConfig): DiagramEngine {
  return new diagramEngine(cfg);
}
