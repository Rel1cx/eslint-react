import type { RulePreset } from "@eslint-react/types";

import * as recommendedTypeScript from "./recommended-typescript";

export const name = "@eslint-react/recommended-type-checked";

export const rules = {
  ...recommendedTypeScript.rules,
  "@eslint-react/no-leaked-conditional-rendering": "warn",
  "@eslint-react/prefer-read-only-props": "warn",
} as const satisfies RulePreset;

export const plugins = {
  ...recommendedTypeScript.plugins,
};

export const settings = {
  ...recommendedTypeScript.settings,
};
