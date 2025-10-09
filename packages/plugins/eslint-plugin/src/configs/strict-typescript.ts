import type { RuleConfig } from "@eslint-react/kit";

import * as ts from "./recommended-typescript";
import * as strict from "./strict";

export const name = "@eslint-react/strict-typescript";

export const rules = {
  ...strict.rules,
  ...ts.rules,
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  ...strict.plugins,
};

export const settings = {
  ...strict.settings,
};
