import type { Linter } from "eslint";

export const name = "react-x/disable-type-checked";

export const rules: Linter.RulesRecord = {
  "react-x/no-implicit-children": "off",
  "react-x/no-implicit-key": "off",
  "react-x/no-implicit-ref": "off",
  "react-x/no-leaked-conditional-rendering": "off",
  "react-x/no-unused-props": "off",
};
