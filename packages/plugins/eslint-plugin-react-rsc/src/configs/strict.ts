import type { RuleConfig } from "@eslint-react/shared";
import * as recommended from "./recommended";

export const name = "react-rsc/strict";

export const rules = {
  ...recommended.rules,
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  ...recommended.plugins,
};

export const settings = {
  ...recommended.settings,
};
