import type { ModdleElement } from "bpmn-js/lib/BaseViewer";
import type Canvas from "diagram-js/lib/core/Canvas";
import type { ContextPadProvider } from "diagram-js/lib/features/context-pad/ContextPad";
import type ContextPad from "diagram-js/lib/features/context-pad/ContextPad";
import type PopupMenu from "diagram-js/lib/features/popup-menu/PopupMenu";

const colorImageSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor">
  <path d="m12.5 5.5.3-.4 3.6-3.6c.5-.5 1.3-.5 1.7 0l1 1c.5.4.5 1.2 0 1.7l-3.6 3.6-.4.2v.2c0 1.4.6 2 1 2.7v.6l-1.7 1.6c-.2.2-.4.2-.6 0L7.3 6.6a.4.4 0 0 1 0-.6l.3-.3.5-.5.8-.8c.2-.2.4-.1.6 0 .9.5 1.5 1.1 3 1.1zm-9.9 6 4.2-4.2 6.3 6.3-4.2 4.2c-.3-.3-.9-.3-1.2 0l-.8-.8-.9-.8-2.3-2.9" />
</svg>`;

export default class ColorContextPadProvider implements ContextPadProvider {
  private _contextPad: ContextPad;
  private _popupMenu: PopupMenu;
  _canvas: Canvas;

  constructor(contextPad: ContextPad, popupMenu: PopupMenu, canvas: Canvas) {
    this._contextPad = contextPad;
    this._popupMenu = popupMenu;
    this._canvas = canvas;

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element: ModdleElement) {
    return this._createPopupAction([element]);
  }

  getMultiElementContextPadEntries(elements: ModdleElement) {
    return this._createPopupAction(elements);
  }

  _createPopupAction(elements: ModdleElement[]) {
    const contextPad = this._contextPad;
    const popupMenu = this._popupMenu;

    return {
      "set-color": {
        group: "edit",
        className: "bpmn-icon-color",
        title: "Set color",
        html: `<div class="entry">${colorImageSvg}</div>`,
        action: {
          click: () => {
            const position = {
              ...this._getStartPosition(contextPad, elements),
              cursor: {
                x: 0,
                y: 0,
              },
            };

            popupMenu.open(elements, "color-picker", position);
          },
        },
      },
    };
  }

  _getStartPosition(contextPad: ContextPad, elements: ModdleElement[]) {
    const Y_OFFSET = 5;
    const pad = contextPad.getPad(elements).html;
    const padRect = pad.getBoundingClientRect();

    return {
      x: padRect.left,
      y: padRect.bottom + Y_OFFSET,
    };
  }
  static $inject = ["contextPad", "popupMenu", "canvas"];
}
