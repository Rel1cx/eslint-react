// A set of HTML void elements that cannot have children. Includes the legacy elements
// 'keygen', 'menuitem', and 'param', which were removed from the current HTML standard
// but are kept for parity with eslint-plugin-react and older React codebases
export const KNOWN_VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "menuitem",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);
