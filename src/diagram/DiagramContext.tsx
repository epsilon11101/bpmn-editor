import { createContext, useContext } from "react";
import type { DiagramService } from "../ports/diagramService";

export const DiagramContext = createContext<DiagramService | null>(null);

export const useDiagram = () => {
  const ctx = useContext(DiagramContext);
  if (!ctx) {
    throw new Error("useDiagram needs DiagramProvider");
  }
  return ctx;
};
