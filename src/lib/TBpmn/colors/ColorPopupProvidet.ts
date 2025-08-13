import type { Attrs, BpmnRendererConfig } from "bpmn-js/lib/draw/BpmnRenderer";
import type { PopupMenu } from "bpmn-js/lib/features/context-pad/ContextPadProvider";
import type Modeling from "bpmn-js/lib/features/modeling/Modeling";
import type { ModdleElement } from "bpmn-js/lib/model/Types";
import type { Element } from "diagram-js/lib/model/Types";
import type { CSSProperties } from "react";

const COLORS = [
  {
    label: "Default",
    fill: undefined,
    stroke: undefined,
  },
  {
    label: "Blue",
    fill: "#BBDEFB",
    stroke: "#0D4372",
  },
  {
    label: "Orange",
    fill: "#FFE0B2",
    stroke: "#6B3C00",
  },
  {
    label: "Green",
    fill: "#C8E6C9",
    stroke: "#205022",
  },
  {
    label: "Red",
    fill: "#FFCDD2",
    stroke: "#831311",
  },
  {
    label: "Purple",
    fill: "#E1BEE7",
    stroke: "#5B176D",
  },
];

interface ConfigType extends Attrs {
  label?: string;
}

export default class ColorPopupProvider {
  private _popupMenu: PopupMenu;
  private _modeling: Modeling;
  private _colors: ConfigType[];
  private _defaultFillColor: CSSProperties["fill"];
  private _defaultStrokeColor: CSSProperties["stroke"];

  constructor(
    config: Element,
    bpmnRendererConfig: BpmnRendererConfig,
    popupMenu: PopupMenu,
    modeling: Modeling
  ) {
    this._popupMenu = popupMenu;
    this._modeling = modeling;

    this._colors = (config && config.colors) || COLORS;
    this._defaultFillColor =
      (bpmnRendererConfig && bpmnRendererConfig.defaultFillColor) || "white";
    this._defaultStrokeColor =
      (bpmnRendererConfig && bpmnRendererConfig.defaultStrokeColor) ||
      "rgb(34, 36, 42)";
    // @ts-expect-error: Ignoramos este error porque TypeScript no reconoce que el registro funcionará sin getPopupMenuEntries
    this._popupMenu.registerProvider("color-picker", this);
  }

  getEntries(elements: ModdleElement[]) {
    const colorIconHtml = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="100%" width="100%">
        <rect rx="2" x="1" y="1" width="22" height="22" fill="var(--fill-color)" stroke="var(--stroke-color)" style="stroke-width:2"></rect>
      </svg>
    `;

    return this._colors.map((color) => {
      const entryColorIconHtml = colorIconHtml
        .replace(
          "var(--fill-color)",
          color.fill || this._defaultFillColor || "white"
        )
        .replace(
          "var(--stroke-color)",
          color.stroke || this._defaultStrokeColor || "black"
        );

      return {
        title: color.label,
        id: color?.label?.toLowerCase() + "-color",
        imageHtml: entryColorIconHtml,
        action: this._createAction(elements, color),
      };
    });
  }

  _createAction(elements: ModdleElement[], color: Attrs) {
    return () => {
      this._modeling.setColor(elements, color);
    };
  }
  // getPopupMenuEntries(element: Element): Record<string, any> {
  //   return {};
  // }

  static $inject = [
    "config.colorPicker",
    "config.bpmnRenderer",
    "popupMenu",
    "modeling",
  ];
}
