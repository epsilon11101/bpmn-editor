import BaseRenderer from "diagram-js/lib/draw/BaseRenderer";

import { is } from "bpmn-js/lib/util/ModelUtil";

import { append as svgAppend, create as svgCreate } from "tiny-svg";

import TRenderLabel from "./TRenderLabel";

import EventBus from "diagram-js/lib/core/EventBus";

import TextRenderer from "bpmn-js/lib/draw/TextRenderer";

export default class TRenderDocument extends BaseRenderer {
  private labelRenderer;
  constructor(eventBus: EventBus, textRenderer: TextRenderer) {
    super(eventBus, 1500);

    this.labelRenderer = new TRenderLabel(textRenderer);
  }

  canRender(element: unknown) {
    return is(element, "ix:Document");
  }

  drawShape(parent: SVGElement, shape: CustomShape) {
    const businessObject = shape.businessObject;
    const di = shape.di;
    const width = shape.width || 156;
    const height = shape.height || 107;

    const scaleX = width / 156;
    const scaleY = height / 107;

    const pathData = `
      M ${1 * scaleX} ${2 * scaleY}
      H ${152.181 * scaleX}
      V ${103.235 * scaleY}
      C ${121.945 * scaleX} ${88.0485 * scaleY}, 
        ${106.827 * scaleX} ${82.9877 * scaleY}, 
        ${76.5906 * scaleX} ${82.9877 * scaleY}
      C ${46.3543 * scaleX} ${82.9877 * scaleY}, 
        ${31.2362 * scaleX} ${77.9269 * scaleY}, 
        ${1 * scaleX} ${62.7408 * scaleY}
      V ${2 * scaleY} Z
    `;

    const documentShape = svgCreate("path", {
      d: pathData,
      fill: di?.fill || businessObject.color || "white",
      stroke: di?.stroke || "black",
      "stroke-width": 2,
    });

    svgAppend(parent, documentShape);
    const textPadding = 10;
    const leftOffset = textPadding;
    const safeBoxWidth = width - 2 * textPadding;

    this.labelRenderer.renderLabel(parent, businessObject.name || "", {
      box: {
        width: safeBoxWidth,
        height: height - 2 * textPadding,
      },
      align: "center-top",
      padding: {
        left: leftOffset,
        top: textPadding + 10,
        bottom: textPadding + 10,
      },
    });

    return documentShape;
  }
  static $inject = ["eventBus", "textRenderer"];
}
