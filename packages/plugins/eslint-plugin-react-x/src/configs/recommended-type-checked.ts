import type { RulePreset } from "@eslint-react/shared";

import * as recommendedTypeScript from "./recommended-typescript";

export const name = "react-x/recommended-type-checked";

export const rules = {
  ...recommendedTypeScript.rules,
  "react-x/no-leaked-conditional-rendering": "warn",
  // "react-x/prefer-read-only-props": "warn",
} as const satisfies RulePreset;

export const settings = {
  ...recommendedTypeScript.settings,
};
