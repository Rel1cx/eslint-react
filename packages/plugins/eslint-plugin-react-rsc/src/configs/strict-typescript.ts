import type { RuleConfig } from "@eslint-react/shared";

import * as strict from "./strict";

export const name = "react-rsc/strict-typescript";

export const rules = {
  ...strict.rules,
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  ...strict.plugins,
};

export const settings = {
  ...strict.settings,
};
