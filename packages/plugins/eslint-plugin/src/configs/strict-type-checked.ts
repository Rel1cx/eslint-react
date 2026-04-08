import type { Linter } from "eslint";

import * as strictTypeScript from "./strict-typescript";

export const name = "@eslint-react/strict-type-checked";

export const rules = {
  ...strictTypeScript.rules,
  "@eslint-react/no-leaked-conditional-rendering": "error",
  "@eslint-react/no-unused-props": "warn",
} as const satisfies Linter.RulesRecord;

export const settings = {
  ...strictTypeScript.settings,
};
