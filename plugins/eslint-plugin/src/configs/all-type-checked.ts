import type { Linter } from "eslint";
import * as all from "./all";

export const name = "@eslint-react/all-type-checked";

export const rules = {
  ...all.rules,
  "@eslint-react/no-implicit-children": "warn",
  "@eslint-react/no-implicit-key": "warn",
  "@eslint-react/no-implicit-ref": "warn",
  "@eslint-react/no-leaked-conditional-rendering": "error",
  "@eslint-react/no-unused-props": "warn",
} as const satisfies Linter.RulesRecord;

export const settings = {
  ...all.settings,
};

export const languageOptions = all.languageOptions;
