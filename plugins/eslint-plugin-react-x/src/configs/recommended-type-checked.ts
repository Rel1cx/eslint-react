import type { Linter } from "eslint";
import * as recommendedTypescript from "./recommended-typescript";

export const name = "react-x/recommended-type-checked";

export const rules = {
  ...recommendedTypescript.rules,
  "react-x/no-leaked-conditional-rendering": "error",
} as const satisfies Linter.RulesRecord;

export const plugins = {
  ...recommendedTypescript.plugins,
};

export const settings = {
  ...recommendedTypescript.settings,
};
