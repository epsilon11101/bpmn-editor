import TextRenderer, {
  type TextLayoutConfig,
} from "bpmn-js/lib/draw/TextRenderer";

import { append as svgAppend } from "tiny-svg";

export default class TRenderLabel {
  private textRenderer;
  constructor(textRenderer: TextRenderer) {
    this.textRenderer = textRenderer;
  }

  renderLabel(parentGfx: SVGElement, text: string, options: TextLayoutConfig) {
    const textElement = this.textRenderer.createText(text, options);

    const existingText = parentGfx.querySelector(".djs-label");
    if (existingText) {
      parentGfx.removeChild(existingText);
    }

    textElement.classList.add("djs-label");

    svgAppend(parentGfx, textElement);

    return textElement;
  }
}
