import "./App.css";

import DiagramComponent from "./diagram/DiagramComponent";
import { DiagramProvider } from "./diagram/DiagramProvider";

function App() {
  return (
    <DiagramProvider>
      <DiagramComponent />
    </DiagramProvider>
  );
}

export default App;
