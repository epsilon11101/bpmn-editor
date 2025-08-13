import BaseRenderer from "diagram-js/lib/draw/BaseRenderer";

import { is } from "bpmn-js/lib/util/ModelUtil";

import { append as svgAppend, create as svgCreate } from "tiny-svg";

import TRenderLabel from "./TRenderLabel";

import EventBus from "diagram-js/lib/core/EventBus";

import TextRenderer from "bpmn-js/lib/draw/TextRenderer";

export default class TRenderText extends BaseRenderer {
  private labelRenderer;

  constructor(eventBus: EventBus, textRenderer: TextRenderer) {
    super(eventBus, 1500);
    this.labelRenderer = new TRenderLabel(textRenderer);
  }

  canRender(element: unknown) {
    return is(element, "ix:Text");
  }

  drawShape(parent: SVGElement, shape: CustomShape) {
    const businessObject = shape.businessObject;

    const width = shape.width;
    const height = shape.height;

    const rect = svgCreate("rect", {
      x: 0,
      y: 0,
      width,
      height,
      fill: "none",
      stroke: "none",
      "stroke-width": 0,
    });

    svgAppend(parent, rect);

    this.labelRenderer.renderLabel(parent, businessObject.name || "", {
      box: {
        width: width,
        height: height,
      },

      align: "left-middle",
    });

    return rect;
  }

  static $inject = ["eventBus", "textRenderer"];
}
