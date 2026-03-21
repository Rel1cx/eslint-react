import type { RuleConfig } from "@eslint-react/shared";

import * as ts from "./_ts";
import * as strict from "./strict";

export const name = "@eslint-react/strict-typescript";

export const rules = {
  ...strict.rules,
  ...ts.rules,
} as const satisfies Record<string, RuleConfig>;

export const settings = {
  ...strict.settings,
};
