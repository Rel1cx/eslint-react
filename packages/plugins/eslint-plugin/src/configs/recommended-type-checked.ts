import type { RuleConfig } from "@eslint-react/shared";

import * as recommendedTypeScript from "./recommended-typescript";

export const name = "@eslint-react/recommended-type-checked";

export const rules = {
  ...recommendedTypeScript.rules,
  "@eslint-react/no-leaked-conditional-rendering": "error",
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  ...recommendedTypeScript.plugins,
};

export const settings = {
  ...recommendedTypeScript.settings,
};
