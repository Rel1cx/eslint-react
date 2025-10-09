import type { RuleConfig } from "@eslint-react/kit";

import * as typeChecked from "./_type-checked";
import * as strictTypescript from "./strict-typescript";

export const name = "@eslint-react/strict-type-checked";

export const rules = {
  ...strictTypescript.rules,
  ...typeChecked.rules,
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  ...strictTypescript.plugins,
};

export const settings = {
  ...strictTypescript.settings,
};
