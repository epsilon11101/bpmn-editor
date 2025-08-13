import BaseRenderer from "diagram-js/lib/draw/BaseRenderer";
import { is } from "bpmn-js/lib/util/ModelUtil";
import { append as svgAppend, create as svgCreate } from "tiny-svg";
import TRenderLabel from "./TRenderLabel";
import EventBus from "diagram-js/lib/core/EventBus";
import TextRenderer from "bpmn-js/lib/draw/TextRenderer";

export default class TRenderDiamond extends BaseRenderer {
  private labelRenderer;

  constructor(eventBus: EventBus, textRenderer: TextRenderer) {
    super(eventBus, 1500);
    this.labelRenderer = new TRenderLabel(textRenderer);
  }

  canRender(element: unknown) {
    return is(element, "ix:Diamond");
  }

  drawShape(parent: SVGElement, shape: CustomShape) {
    const businessObject = shape.businessObject;
    const di = shape.di;
    const width = shape.width || 100;
    const height = shape.height || 100;

    // Definir el contorno del rombo
    const pathData = `
      M ${width / 2} 0 
      L ${width} ${height / 2} 
      L ${width / 2} ${height} 
      L 0 ${height / 2} 
      Z
    `;

    // Crear el rombo
    const diamondShape = svgCreate("path", {
      d: pathData,
      fill: di?.fill || businessObject.color || "white",
      stroke: di?.stroke || "black",
      "stroke-width": 2,
    });

    svgAppend(parent, diamondShape);

    const safeBoxWidth = width * 1;
    const safeBoxHeight = height * 1;

    this.labelRenderer.renderLabel(parent, businessObject.name || "", {
      box: {
        width: safeBoxWidth,
        height: safeBoxHeight,
      },
      align: "center-middle",
      padding: {
        left: 25,
        right: 25,
        top: 40,
        bottom: 40,
      },
    });

    return diamondShape;
  }

  static $inject = ["eventBus", "textRenderer"];
}
