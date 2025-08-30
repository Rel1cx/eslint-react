import type { RuleConfig } from "@eslint-react/kit";

import * as recommendedTypeScript from "./recommended-typescript";

export const name = "react-x/recommended-type-checked";

export const rules = {
  ...recommendedTypeScript.rules,
  "react-x/no-leaked-conditional-rendering": "warn",
  "react-x/no-unused-props": "warn",
} as const satisfies Record<string, RuleConfig>;

export const settings = {
  ...recommendedTypeScript.settings,
};
