import BaseRenderer from "diagram-js/lib/draw/BaseRenderer";

import { is } from "bpmn-js/lib/util/ModelUtil";

import { append as svgAppend, create as svgCreate } from "tiny-svg";

import TRenderLabel from "./TRenderLabel";

import TextRenderer from "bpmn-js/lib/draw/TextRenderer";

import BpmnRenderer from "bpmn-js/lib/draw/BpmnRenderer";

import EventBus from "diagram-js/lib/core/EventBus";

export default class TRenderTerminal extends BaseRenderer {
  private labelRenderer;
  bpmnRenderer: BpmnRenderer;

  constructor(
    eventBus: EventBus,
    textRenderer: TextRenderer,
    bpmnRenderer: BpmnRenderer
  ) {
    super(eventBus, 1500);

    this.labelRenderer = new TRenderLabel(textRenderer);
    this.bpmnRenderer = bpmnRenderer;
  }

  canRender(element: unknown) {
    return is(element, "ix:Terminal");
  }

  drawShape(parent: SVGElement, shape: CustomShape) {
    // console.log(parent, shape)
    const businessObject = shape.businessObject;
    const di = shape.di;
    // console.log('render', shape.width, parent)
    const width = shape.width || 160;
    const height = shape.height || 40;

    const boundingRect = svgCreate("rect", {
      x: 0,
      y: 0,
      width: width,
      height: height,
      rx: Math.min(width, height) / 2,
      ry: Math.min(width, height) / 2,
      fill: di?.fill || businessObject.color || "white",
      stroke: di?.stroke || "black",
      "stroke-width": 2,
    });

    svgAppend(parent, boundingRect);

    this.labelRenderer.renderLabel(parent, businessObject.name || "", {
      box: {
        width: width,
        height: height,
      },
      align: "center-middle",
    });

    return boundingRect;
  }

  static $inject = ["eventBus", "textRenderer"];
}
