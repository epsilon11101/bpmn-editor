import type { Create } from "bpmn-js/lib/features/context-pad/ContextPadProvider";
import {
  Document,
  DiamondPalette,
  Terminal,
  Dashed,
  LogicGate,
  TextShape,
  MagneticTape,
  StoredData,
} from "./customShapes";

import ElementFactory from "bpmn-js/lib/features/modeling/ElementFactory";
import { type Palette } from "bpmn-js/lib/features/palette/PaletteProvider";

export default class TShapesProvider {
  private _create: Create;
  private _elementFactory: ElementFactory;
  constructor(
    _create: Create,
    _elementFactory: ElementFactory,
    palette: Palette
  ) {
    this._create = _create;
    this._elementFactory = _elementFactory;

    palette.registerProvider(this);
  }

  getPaletteEntries = () => {
    const { _create: create, _elementFactory: elementFactory } = this;

    const startCreate =
      (type: string, width: number, height: number) => (event: Event) => {
        const shape = elementFactory.create("shape", {
          type: type,
          width: width,
          height: height,
        });

        create.start(event, shape);
      };

    return (entries) => {
      // Eliminar los elementos predeterminados de BPMN
      delete entries["create.start-event"];
      delete entries["create.end-event"];
      delete entries["create.subprocess-expanded"];
      delete entries["create.exclusive-gateway"];
      delete entries["create.intermediate-event"];
      delete entries["create.group"];
      return {
        ...entries,
        "create-custom-task": {
          group: "gateway",
          title: "Create  new document",
          imageUrl: Document.dataURL,
          className: "ixDocument",
          action: {
            dragstart: startCreate("ix:Document", 150, 100),
            click: startCreate("ix:Document", 150, 100),
          },
        },
        "create-custom-text": {
          group: "gateway",
          title: "Create new text",
          className: "ixText",
          imageUrl: TextShape.dataURL,
          action: {
            dragstart: startCreate("ix:Text", 50, 50),
            click: startCreate("ix:Text", 50, 50),
          },
        },
        "create-custom-gateway": {
          group: "gateway",
          title: "Create  new decision",
          className: "ixDiamond",
          imageUrl: DiamondPalette.dataURL,
          action: {
            dragstart: startCreate("ix:Diamond", 100, 100),
            click: startCreate("ix:Diamond", 100, 100),
          },
        },
        "create-custom-terminal": {
          group: "gateway",
          title: "Create  new terminal",
          className: "ixTerminal",
          imageUrl: Terminal.dataURL,
          action: {
            dragstart: startCreate("ix:Terminal", 150, 50),
            click: startCreate("ix:Terminal", 150, 50),
          },
        },
        "create-custom-dashed": {
          group: "gateway",
          title: "Create  new connector",
          className: "ixConector",
          imageUrl: Dashed.dataURL,
          action: {
            dragstart: startCreate("ix:Connector", 40, 40),
            click: startCreate("ix:Connector", 40, 40),
          },
        },
        "create-custom-logicGate": {
          group: "gateway",
          title: "Create  new logic gate",
          className: "ixLogicGate",
          imageUrl: LogicGate.dataURL,
          action: {
            dragstart: startCreate("ix:LogicGate", 50, 50),
            click: startCreate("ix:LogicGate", 50, 50),
          },
        },
        "create-custom-storedData": {
          group: "gateway",
          title: "Create  new stored data",
          className: "ixStoredData",
          imageUrl: StoredData.dataURL,
          action: {
            dragstart: startCreate("ix:StoredData", 50, 50),
            click: startCreate("ix:StoredData", 50, 50),
          },
        },
        "create-custom-magneticTape": {
          group: "gateway",
          title: "Create new magnetic tape",
          className: "ixMagneticTape",
          imageUrl: MagneticTape.dataURL,
          action: {
            dragstart: startCreate("ix:MagneticTape", 150, 100),
            click: startCreate("ix:MagneticTape", 150, 100),
          },
        },
      };
    };
  };
  static $inject = ["create", "elementFactory", "palette"];
}
