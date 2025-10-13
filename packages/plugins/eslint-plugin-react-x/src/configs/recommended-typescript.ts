import type { RuleConfig } from "@eslint-react/shared";

import * as ts from "./_ts";
import * as recommended from "./recommended";

export const name = "react-x/recommended-typescript";

export const rules = {
  ...recommended.rules,
  ...ts.rules,
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  ...recommended.plugins,
};

export const settings = {
  ...recommended.settings,
};
