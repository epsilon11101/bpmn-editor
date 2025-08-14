export const normalizeXML = (xml: string) => {
  return xml.trim().replace(/\s+/g, " ").replace(/>\s+</g, "><");
};
