import { describe, it, expect, vi } from "vitest";
import { downloadFile, normalizeXML } from "./utils";

describe("utils", () => {
  it("normalizeXML should trim and format XML", () => {
    const input = `  <root>\n   <child>  </child>\n</root>  `;
    const output = normalizeXML(input);
    expect(output).toBe("<root><child></child></root>");
  });

  it("downloadFile should create and click an anchor", () => {
    const createElementSpy = vi.spyOn(document, "createElement");
    const appendChildSpy = vi.spyOn(document.body, "appendChild");
    const removeChildSpy = vi.spyOn(document.body, "removeChild");
    // Mock URL.createObjectURL if not present
    if (!URL.createObjectURL) {
      URL.createObjectURL = vi.fn(() => "blob:mock-url");
    }
    // Mock URL.revokeObjectURL if not present
    if (!URL.revokeObjectURL) {
      URL.revokeObjectURL = vi.fn();
    }
    const createObjectURLSpy = vi.spyOn(URL, "createObjectURL");
    const revokeSpy = vi.spyOn(URL, "revokeObjectURL");
    const a = document.createElement("a");
    a.click = vi.fn();
    createElementSpy.mockReturnValue(a);

    downloadFile("test", "file.txt", "text/plain");

    expect(createElementSpy).toHaveBeenCalledWith("a");
    expect(appendChildSpy).toHaveBeenCalledWith(a);
    expect(a.download).toBe("file.txt");
    expect(a.href).toMatch(/^blob:/);
    expect(a.click).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalledWith(a);
    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(revokeSpy).toHaveBeenCalled();

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
    createObjectURLSpy.mockRestore();
    revokeSpy.mockRestore();
  });
});
