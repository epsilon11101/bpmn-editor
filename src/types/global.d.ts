import type { AutoPlace } from "bpmn-js/lib/features/auto-place/BpmnAutoPlace";
import type { ModdleElement } from "bpmn-js/lib/BaseViewer";
import type { Shape } from "bpmn-js/lib/model/Types";
import { Shape as ModelShape } from "diagram-js/lib/model";

declare global {
  interface AutoPlaceWithAppend extends AutoPlace {
    append(element: ModdleElement, shape: Shape): void;
  }

  interface CustomShape extends ModelShape {
    di?: {
      fill?: string;
      stroke?: string;
    };
  }

  interface ResizeRuleData {
    shape: {
      businessObject: {
        $instanceOf: (type: string) => boolean;
      };
    };
    newBounds?: {
      width: number;
      height: number;
    };
  }
  declare module "*.bpmn" {
    const content: string;
    export default content;
  }

  declare module "*.xml" {
    const content: string;
    export default content;
  }
}
