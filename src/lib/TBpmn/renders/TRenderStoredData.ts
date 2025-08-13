import BaseRenderer from "diagram-js/lib/draw/BaseRenderer";

import { is } from "bpmn-js/lib/util/ModelUtil";

import { append as svgAppend, create as svgCreate } from "tiny-svg";

import TRenderLabel from "./TRenderLabel";

import EventBus from "diagram-js/lib/core/EventBus";

import TextRenderer from "bpmn-js/lib/draw/TextRenderer";

export default class TRenderStoredData extends BaseRenderer {
  private labelRenderer;

  constructor(eventBus: EventBus, textRenderer: TextRenderer) {
    super(eventBus, 1500);
    this.labelRenderer = new TRenderLabel(textRenderer);
  }

  canRender(element: unknown) {
    return is(element, "ix:StoredData");
  }

  drawShape(parent: SVGElement, shape: CustomShape) {
    const businessObject = shape.businessObject;
    const di = shape.di;

    const width = shape.width;
    const height = shape.height;

    const path = svgCreate("path", {
      d: `M${width * 0.98} ${height * 0.01} 
        L${width * 0.5} ${height * 0.975} 
        L${width * 0.26} ${height * 0.49} 
        L${width * 0.018} ${height * 0.01} 
        H${width * 0.98} Z`,
      fill: di?.fill || businessObject?.color || "#ffffff",
      stroke: di?.stroke || "black",
      "stroke-width": 2,
    });

    svgAppend(parent, path);

    // Agregar texto si es necesario
    this.labelRenderer.renderLabel(parent, businessObject.name || "", {
      box: {
        width: width,
        height: height,
      },
      align: "center-middle",
    });

    return parent;
  }
  static $inject = ["eventBus", "textRenderer"];
}
