import BaseRenderer from "diagram-js/lib/draw/BaseRenderer";

import { is } from "bpmn-js/lib/util/ModelUtil";

import { append as svgAppend, create as svgCreate } from "tiny-svg";

import TRenderLabel from "./TRenderLabel";

import EventBus from "diagram-js/lib/core/EventBus";

import TextRenderer from "bpmn-js/lib/draw/TextRenderer";

export default class TRenderLogicGate extends BaseRenderer {
  private labelRenderer;

  constructor(eventBus: EventBus, textRenderer: TextRenderer) {
    super(eventBus, 1500);
    this.labelRenderer = new TRenderLabel(textRenderer);
  }

  canRender(element: unknown) {
    return is(element, "ix:LogicGate");
  }

  drawShape(parent: SVGElement, shape: CustomShape) {
    const businessObject = shape.businessObject;
    const di = shape.di;

    const width = shape.width || 100; // Default width
    const height = shape.height || 100; // Default height
    const fillColor = di?.fill || businessObject.color || "white";

    const customShape = svgCreate("svg", {
      width: width,
      height: height,
      viewBox: "0 0 569 578",
    });

    const path = svgCreate("path", {
      d: "M558.5 10H10V279L302 563L558.5 279V10Z",
      fill: fillColor,
      stroke: di?.stroke || "black",
      "stroke-width": 16,
    });

    svgAppend(customShape, path);
    svgAppend(parent, customShape);

    this.labelRenderer.renderLabel(parent, businessObject.name || "", {
      box: {
        width: width,
        height: height,
      },
      align: "center-middle",
    });

    return customShape;
  }
  static $inject = ["eventBus", "textRenderer"];
}
