import type { RuleConfig } from "@eslint-react/kit";

import * as tc from "./_tc";
import * as recommendedTypeScript from "./recommended-typescript";

export const name = "@eslint-react/recommended-type-checked";

export const rules = {
  ...recommendedTypeScript.rules,
  ...tc.rules,
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  ...recommendedTypeScript.plugins,
};

export const settings = {
  ...recommendedTypeScript.settings,
};
