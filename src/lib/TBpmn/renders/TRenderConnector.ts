import BaseRenderer from "diagram-js/lib/draw/BaseRenderer";

import { is } from "bpmn-js/lib/util/ModelUtil";

import { append as svgAppend, create as svgCreate } from "tiny-svg";

import TRenderLabel from "./TRenderLabel";

import EventBus from "diagram-js/lib/core/EventBus";

import TextRenderer from "bpmn-js/lib/draw/TextRenderer";

export default class TRenderConnector extends BaseRenderer {
  private labelRenderer;

  constructor(eventBus: EventBus, textRenderer: TextRenderer) {
    super(eventBus, 1500);
    this.labelRenderer = new TRenderLabel(textRenderer);
  }

  canRender(element: unknown) {
    return is(element, "ix:Connector");
  }

  drawShape(parent: SVGElement, shape: CustomShape) {
    const businessObject = shape.businessObject;
    const di = shape.di;

    const width = shape.width;
    const height = shape.height;
    const size = Math.min(width, height);
    const cx = width / 2;
    const cy = height / 2;
    const rx = size / 2;
    const ry = size / 2;

    const dashedShape = svgCreate("ellipse", {
      cx,
      cy,
      rx,
      ry,
      fill: di?.fill || businessObject.color || "white",
      stroke: di?.stroke || "black",
      "stroke-width": 2,
      // 'stroke-dasharray': '5,5',
    });

    svgAppend(parent, dashedShape);

    this.labelRenderer.renderLabel(parent, businessObject.name || "", {
      box: {
        width: width,
        height: height,
      },
      align: "center-middle",
    });

    return dashedShape;
  }
  static $inject = ["eventBus", "textRenderer"];
}
