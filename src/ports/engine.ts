// create class that implements diagramengine
//create function that return bpmnengine
//Create singlenton to create only one bpmn engine

import type { ModdleExtension } from "bpmn-js/lib/BaseViewer";
import BpmnModeler from "bpmn-js/lib/Modeler";
import type { Capabilities, DiagramApi, DiagramEngine } from "./diagramApi";
import { normalizeXML } from "../utils/utils";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

type EngineConfig = {
  // eslint-disable-next-line
  additionalModules?: any[];
  moddleExtensions?: Record<string, ModdleExtension>;
  taskResizingEnabled?: boolean;
  eventResizingEnabled?: boolean;
};

const emptyDiagram = `
  <?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="Definitions_02dbtyp" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="18.6.1">
  <bpmn:process id="Process_07itzzv" isExecutable="false" />
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_07itzzv" />
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
  `;

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
      taskResizingEnabled: this.cfg?.taskResizingEnabled || false,
      eventResizingEnabled: this.cfg?.eventResizingEnabled || false,
    });
    try {
      // empty diagram
      await this.modeler.importXML(emptyDiagram);
    } catch (err) {
      console.error("reading error", err);
    }
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
    return currentXML;
  }
  async exportImage() {
    const data = await this.modeler?.saveSVG();
    return data?.svg;
  }
}

export function createBpmnModelerEngine(cfg: EngineConfig): DiagramEngine {
  return new diagramEngine(cfg);
}
