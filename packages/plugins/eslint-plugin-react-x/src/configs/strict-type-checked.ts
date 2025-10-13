import type { RuleConfig } from "@eslint-react/shared";

import * as strictTypeScript from "./strict-typescript";

export const name = "react-x/strict-type-checked";

export const rules = {
  ...strictTypeScript.rules,
  "react-x/no-leaked-conditional-rendering": "error",
  "react-x/no-unused-props": "warn",
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  ...strictTypeScript.plugins,
};

export const settings = {
  ...strictTypeScript.settings,
};
