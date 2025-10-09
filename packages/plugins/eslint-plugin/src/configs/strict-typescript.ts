import type { RuleConfig } from "@eslint-react/kit";

import * as strict from "./_strict";
import * as recommendedTypescript from "./recommended-typescript";

export const name = "@eslint-react/strict-typescript";

export const rules = {
  ...recommendedTypescript.rules,
  ...strict.rules,
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  ...recommendedTypescript.plugins,
};

export const settings = {
  ...recommendedTypescript.settings,
};
