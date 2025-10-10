import type { RuleConfig } from "@eslint-react/kit";

import * as ts from "./_ts";
import * as strict from "./strict";

export const name = "react-x/strict-typescript";

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
