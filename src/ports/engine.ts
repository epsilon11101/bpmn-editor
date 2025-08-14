import type { ModdleExtension } from "bpmn-js/lib/BaseViewer";
import BpmnModeler from "bpmn-js/lib/Modeler";
import type { Capabilities, DiagramEngine } from "./diagramApi";
import { normalizeXML } from "../utils/utils";

type EngineConfig = {
  // eslint-disable-next-line
  additionalModules?: any[];
  moddleExtensions?: Record<string, ModdleExtension>;
  taskResizingEnabled?: boolean;
  eventResizingEnabled?: boolean;
};

export function createBpmnModelerEngine(cfg: EngineConfig): DiagramEngine {
  let modeler: BpmnModeler | null = null;
  return {
    async mount(container) {
      if (modeler) return;
      modeler = new BpmnModeler({
        container: container,
        additionalModules: cfg?.additionalModules,
        moddleExtensions: cfg?.moddleExtensions || {},
        taskResizingEnabled: cfg?.moddleExtensions || false,
        eventResizingEnabled: cfg?.eventResizingEnabled || false,
      });
    },
    destroy() {
      try {
        modeler?.destroy?.();
      } finally {
        modeler = null;
      }
    },
    getCapabilities(): Capabilities {
      return { editable: true };
    },
    async exportDiagram() {
      const data = await modeler?.saveXML();
      const currentXML = normalizeXML(data?.xml);
      console.log(currentXML);
    },
    async exportImage() {
      const data = await modeler?.saveSVG();
      console.log(data);
    },
  };
}
