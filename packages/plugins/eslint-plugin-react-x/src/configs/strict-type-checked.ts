import type { RuleConfig } from "@eslint-react/kit";

import * as tc from "./_tc";
import * as strictTypeScript from "./strict-typescript";

export const name = "react-x/strict-type-checked";

export const rules = {
  ...strictTypeScript.rules,
  ...tc.rules,
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  ...strictTypeScript.plugins,
};

export const settings = {
  ...strictTypeScript.settings,
};
