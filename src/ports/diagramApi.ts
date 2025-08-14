// diagramAPi.ts

export type Capabilities = { editable: boolean };

export interface DiagramApi {
  getCapabilities(): Capabilities;
  mount(container: HTMLElement): Promise<void>;
  destroy(): void;
  exportDiagram(): Promise<void>;
  exportImage(): Promise<void>;
}

export type DiagramEngine = DiagramApi;
