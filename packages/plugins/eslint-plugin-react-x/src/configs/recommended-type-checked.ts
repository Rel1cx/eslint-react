import type { RuleConfig } from "@eslint-react/shared";

import * as recommendedTypescript from "./recommended-typescript";

export const name = "react-x/recommended-type-checked";

export const rules = {
  ...recommendedTypescript.rules,
  "react-x/no-implicit-key": "error",
  "react-x/no-leaked-conditional-rendering": "error",
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  ...recommendedTypescript.plugins,
};

export const settings = {
  ...recommendedTypescript.settings,
};
