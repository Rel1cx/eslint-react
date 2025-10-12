import type { RuleConfig } from "@eslint-react/kit";

import * as strictTypeScript from "./strict-typescript";

export const name = "@eslint-react/strict-type-checked";

export const rules = {
  ...strictTypeScript.rules,
  "@eslint-react/no-leaked-conditional-rendering": "error",
  "@eslint-react/no-unused-props": "warn",
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  ...strictTypeScript.plugins,
};

export const settings = {
  ...strictTypeScript.settings,
};
