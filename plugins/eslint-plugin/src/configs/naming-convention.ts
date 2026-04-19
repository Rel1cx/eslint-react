import type { Linter } from "eslint";

export const name = "@eslint-react/naming-convention";

export const rules = {
  "@eslint-react/naming-convention-context-name": "warn",
  "@eslint-react/naming-convention-id-name": "warn",
  "@eslint-react/naming-convention-ref-name": "warn",
} as const satisfies Linter.RulesRecord;
