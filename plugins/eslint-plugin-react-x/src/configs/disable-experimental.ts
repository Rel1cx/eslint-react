import type { Linter } from "eslint";

export const name = "react-x/disable-experimental";

export const rules: Linter.RulesRecord = {
  "react-x/globals": "off",
  "react-x/immutability": "off",
  "react-x/no-duplicate-key": "off",
  "react-x/no-implicit-children": "off",
  "react-x/no-implicit-key": "off",
  "react-x/no-implicit-ref": "off",
  "react-x/no-misused-capture-owner-stack": "off",
  "react-x/no-unused-props": "off",
  "react-x/no-unused-state": "off",
  "react-x/refs": "off",
  "react-x/set-state-in-render": "off",
};
