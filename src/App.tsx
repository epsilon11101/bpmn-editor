import "./App.css";
import { DiagramService } from "./ports/diagramService";
import { createBpmnModelerEngine } from "./ports/engine";
import ixModdle from "./lib/TBpmn/moddleDefinition.json";
import TBPMNModel from "./lib/TBpmn";
import { DiagramContext } from "./diagram/DiagramContext";
import DiagramComponent from "./diagram/DiagramComponent";

const bpmnEngine = createBpmnModelerEngine({
  additionalModules: [TBPMNModel],
  moddleExtensions: {
    ix: ixModdle,
  },
  taskResizingEnabled: true,
  eventResizingEnabled: true,
});
const diagramService = new DiagramService(bpmnEngine);

function App() {
  return (
    <DiagramContext.Provider value={diagramService}>
      <DiagramComponent />
    </DiagramContext.Provider>
  );
}

export default App;
