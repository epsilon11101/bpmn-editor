import type { Capabilities, DiagramApi, DiagramEngine } from "./diagramApi";

export class DiagramService implements DiagramApi {
  private engine: DiagramEngine;
  constructor(engine: DiagramEngine) {
    this.engine = engine;
  }

  getCapabilities(): Capabilities {
    return this.engine.getCapabilities();
  }

  mount(component: HTMLElement) {
    return this.engine.mount(component);
  }

  destroy() {
    this.engine.destroy();
  }

  exportDiagram() {
    return this.engine.exportDiagram();
  }

  exportImage() {
    return this.engine.exportImage();
  }
}
