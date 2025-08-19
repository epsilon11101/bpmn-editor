import { useEffect, useRef } from "react";
import { useDiagram } from "./DiagramContext";

const DiagramComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramService = useDiagram();

  useEffect(() => {
    const initializeModeler = async () => {
      if (containerRef.current) {
        diagramService.mount(containerRef.current);
      }
    };

    initializeModeler();
    return () => {
      diagramService.destroy();
    };
  }, [diagramService]);

  return (
    <>
      <div
        aria-label="contenedor"
        ref={containerRef}
        style={{ width: "100%", height: "100vh", border: "1px solid #fff" }}
      />
    </>
  );
};

export default DiagramComponent;
