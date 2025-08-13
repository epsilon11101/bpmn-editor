import BaseRenderer from "diagram-js/lib/draw/BaseRenderer";

import { is } from "bpmn-js/lib/util/ModelUtil";

import { append as svgAppend, create as svgCreate } from "tiny-svg";

import TRenderLabel from "./TRenderLabel";

import EventBus from "diagram-js/lib/core/EventBus";

import TextRenderer from "bpmn-js/lib/draw/TextRenderer";

export default class TRenderMagneticTape extends BaseRenderer {
  private labelRenderer;

  constructor(eventBus: EventBus, textRenderer: TextRenderer) {
    super(eventBus, 1500);
    this.labelRenderer = new TRenderLabel(textRenderer);
  }

  canRender(element: unknown) {
    return is(element, "ix:MagneticTape");
  }

  drawShape(parent: SVGElement, shape: CustomShape) {
    const businessObject = shape.businessObject;
    const di = shape.di;

    const width = shape.width;
    const height = shape.height;

    const rect = svgCreate("rect", {
      x: 0,
      y: 0,
      width: width,
      height: height,
      fill: di?.fill || businessObject?.color || "#ffffff",
      stroke: di?.stroke || "black",
      "stroke-width": 2,
    });

    svgAppend(parent, rect);

    const line1 = svgCreate("line", {
      x1: width * 0.1,
      y1: 0,
      x2: width * 0.1,
      y2: height,
      stroke: di?.stroke || "black",
      "stroke-width": 2,
    });

    svgAppend(parent, line1);

    const line2 = svgCreate("line", {
      x1: width * 0.9,
      y1: 0,
      x2: width * 0.9,
      y2: height,
      stroke: di?.stroke || "black",
      "stroke-width": 2,
    });

    svgAppend(parent, line2);

    const textPadding = 1;
    const leftOffset = width * 0.2 + textPadding;
    const safeBoxWidth = width * 0.8 - textPadding * 2;

    this.labelRenderer.renderLabel(parent, businessObject.name || "", {
      box: {
        width: safeBoxWidth,
        height: height - textPadding * 2,
      },
      align: "center-middle",
      padding: {
        left: leftOffset,
        top: textPadding,
      },
    });

    return parent;
  }
  static $inject = ["eventBus", "textRenderer"];
}
