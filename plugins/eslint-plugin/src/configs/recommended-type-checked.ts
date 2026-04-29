import type { Linter } from "eslint";
import * as recommendedTypeScript from "./recommended-typescript";

export const name = "@eslint-react/recommended-type-checked";

export const rules = {
  ...recommendedTypeScript.rules,
  "@eslint-react/no-leaked-conditional-rendering": "error",
} as const satisfies Linter.RulesRecord;

export const settings = {
  ...recommendedTypeScript.settings,
};
