import type {
  ContextPadConfig,
  Create,
} from "bpmn-js/lib/features/context-pad/ContextPadProvider";
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
import type { ModdleElement } from "bpmn-js/lib/model/Types";
import type ContextPad from "diagram-js/lib/features/context-pad/ContextPad";
import type { Injector } from "diagram-js/lib/command/CommandStack";

export default class TServiceTaskIcons {
  private create: Create;
  private elementFactory: ElementFactory;
  private autoPlace: AutoPlaceWithAppend | null = null;

  constructor(
    config: ContextPadConfig,
    contextPad: ContextPad,
    create: Create,
    elementFactory: ElementFactory,
    injector: Injector
  ) {
    this.create = create;
    this.elementFactory = elementFactory;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get("autoPlace", false);
    }

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element: ModdleElement) {
    const { autoPlace, create, elementFactory } = this;

    function appendServiceTask(type: string, width: number, height: number) {
      return function (event: Event, element: ModdleElement) {
        if (autoPlace) {
          const shape = elementFactory.createShape({
            type: type,
          });

          autoPlace.append(element, shape);
        } else {
          appendServiceTaskStart(type, width, height)(event);
        }
      };
    }

    function appendServiceTaskStart(
      type: string,
      width: number,
      height: number
    ) {
      return function (event: Event) {
        const shape = elementFactory.createShape({
          type: type,
          width: width,
          height: height,
        });

        create.start(event, shape, element);
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (entries: any) => {
      // Eliminar los elementos predeterminados de BPMN
      delete entries["append.end-event"];
      delete entries["append.exclusive-gateway"];
      delete entries["append.intermediate-event"];
      return {
        ...entries,
        "append.create-custom-document": {
          group: "model",
          title: "Create  new document",
          imageUrl: Document.dataURL,
          action: {
            dragstart: appendServiceTask("ix:Document", 150, 100),
            click: appendServiceTaskStart("ix:Document", 150, 100),
          },
        },
        "append.create-custom-text": {
          group: "model",
          title: "Create  new text",
          imageUrl: TextShape.dataURL,
          action: {
            dragstart: appendServiceTask("ix:Text", 50, 50),
            click: appendServiceTaskStart("ix:Text", 50, 50),
          },
        },
        "append.create-custom-diamond": {
          group: "model",
          title: "Create  new decision",
          imageUrl: DiamondPalette.dataURL,
          action: {
            dragstart: appendServiceTask("ix:Diamond", 100, 100),
            click: appendServiceTaskStart("ix:Diamond", 100, 100),
          },
        },
        "append.create-custom-terminal": {
          group: "model",
          title: "Create  new terminal",
          imageUrl: Terminal.dataURL,
          action: {
            dragstart: appendServiceTask("ix:Terminal", 150, 50),
            click: appendServiceTaskStart("ix:Terminal", 150, 50),
          },
        },
        "append.create-custom-connector": {
          group: "model",
          title: "Create  new connector",
          imageUrl: Dashed.dataURL,
          action: {
            dragstart: appendServiceTask("ix:Connector", 40, 40),
            click: appendServiceTaskStart("ix:Connector", 40, 40),
          },
        },
        "append.create-custom-logicGate": {
          group: "model",
          title: "Create  new connector",
          imageUrl: LogicGate.dataURL,
          action: {
            dragstart: appendServiceTask("ix:LogicGate", 50, 50),
            click: appendServiceTaskStart("ix:LogicGate", 50, 50),
          },
        },
        "append.create-custom-storedData": {
          group: "model",
          title: "Create  new stored data",
          imageUrl: StoredData.dataURL,
          action: {
            dragstart: appendServiceTask("ix:StoredData", 50, 50),
            click: appendServiceTaskStart("ix:StoredData", 50, 50),
          },
        },
        "append.create-custom-MagneticTape": {
          group: "model",
          title: "Create new magnetic tape",
          imageUrl: MagneticTape.dataURL,
          action: {
            dragstart: appendServiceTask("ix:MagneticTape", 150, 100),
            click: appendServiceTaskStart("ix:MagneticTape", 150, 100),
          },
        },
      };
    };
  }

  static $inject = [
    "config",
    "contextPad",
    "create",
    "elementFactory",
    "injector",
  ];
}
