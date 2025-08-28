import { useEffect, useRef, type FC, type ReactNode } from "react";
import { DiagramContext } from "./DiagramContext";
import { createBpmnModelerEngine } from "../ports/engine";
import { DiagramService } from "../ports/diagramService";
import ixModdle from "../lib/TBpmn/moddleDefinition.json";
import TBPMNModel from "../lib/TBpmn";

export const DiagramProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramServiceRef = useRef<DiagramService | null>(null);

  if (!diagramServiceRef.current) {
    const bpmnEngine = createBpmnModelerEngine({
      additionalModules: [TBPMNModel],
      moddleExtensions: {
        ix: ixModdle,
      },
      taskResizingEnabled: true,
      eventResizingEnabled: true,
    });
    diagramServiceRef.current = new DiagramService(bpmnEngine);
  }

  useEffect(() => {
    const initializeModeler = async () => {
      if (containerRef.current && diagramServiceRef.current) {
        diagramServiceRef.current.mount(containerRef.current);
      }
    };
    initializeModeler();
    return () => {
      diagramServiceRef.current?.destroy();
    };
  }, []);

  return (
    <DiagramContext.Provider value={diagramServiceRef.current}>
      <div
        aria-label="contenedor"
        ref={containerRef}
  style={{ width: "100%", height: "100vh", border: "2px solid #e2007a" }}
      />
      {children}
    </DiagramContext.Provider>
  );
};
