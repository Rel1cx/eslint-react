import type { Linter } from "eslint";

export const name = "react-rsc/disable-experimental";

export const rules: Linter.RulesRecord = {
  "react-rsc/function-definition": "off",
};
