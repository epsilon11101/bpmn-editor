import { useEffect, useRef, type FC, type ReactNode } from "react";
import { DiagramContext, useDiagram } from "./DiagramContext";
import { createBpmnModelerEngine } from "../ports/engine";
import { DiagramService } from "../ports/diagramService";
import ixModdle from "../lib/TBpmn/moddleDefinition.json";
import TBPMNModel from "../lib/TBpmn";

const bpmnEngine = createBpmnModelerEngine({
  additionalModules: [TBPMNModel],
  moddleExtensions: {
    ix: ixModdle,
  },
  taskResizingEnabled: true,
  eventResizingEnabled: true,
});
const diagramService = new DiagramService(bpmnEngine);

export const DiagramProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramEngine = useDiagram();

  useEffect(() => {
    const initializeModeler = async () => {
      if (containerRef.current) {
        diagramEngine.mount(containerRef.current);
      }
    };

    initializeModeler();
    return () => {
      diagramEngine.destroy();
    };
  }, [diagramEngine]);

  return (
    <DiagramContext.Provider value={diagramService}>
      <div
        aria-label="contenedor"
        ref={containerRef}
        style={{ width: "100%", height: "100vh", border: "1px solid #fff" }}
      />
      {children}
    </DiagramContext.Provider>
  );
};
