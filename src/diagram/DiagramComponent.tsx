import { useState } from "react";
import { useDiagram } from "./DiagramContext";
import { downloadFile } from "../utils/utils";

const DiagramComponent = () => {
  const diagramService = useDiagram();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDownloadImage = async () => {
    const svg = await diagramService.exportImage();
    downloadFile(svg, "bpmn-diagrama.svg", "image/svg+xml");
    setMenuOpen(false);
  };

  const handleDownloadDiagram = async () => {
    const xml = await diagramService.exportDiagram();
    downloadFile(xml, "bpmn-diagrama.bpmn", "text/xml");
    setMenuOpen(false);
  };

  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <button
            className="bg-[#e2007a] text-white px-8 py-4 rounded-lg shadow-lg hover:bg-[#c1006a] cursor-pointer focus:outline-none text-lg font-semibold transition-all duration-300"
            style={{ minWidth: "180px", minHeight: "56px" }}
            onClick={() => setMenuOpen((open) => !open)}
          >
            Descargar
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg transition-all duration-300 opacity-100 translate-y-0"
              style={{ opacity: 1, transform: "translateY(0)" }}
            >
              <button
                className="block w-full text-left px-4 py-2 hover:bg-[#f062a7] cursor-pointer"
                onClick={handleDownloadImage}
              >
                Descargar imagen
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-[#f062a7] cursor-pointer"
                onClick={handleDownloadDiagram}
              >
                Descargar diagrama
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiagramComponent;
