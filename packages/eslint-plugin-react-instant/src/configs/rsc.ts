import type { Linter } from "eslint";

export const name = "@eslint-react/rsc";

export const rules = {
  "@eslint-react/rsc-function-definition": "error",
} as const satisfies Linter.RulesRecord;
