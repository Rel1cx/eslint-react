import type { Linter } from "eslint";
import * as recommended from "./recommended";

export const name = "react-rsc/strict";

export const rules = {
  ...recommended.rules,
} as const satisfies Linter.RulesRecord;

export const plugins = {
  ...recommended.plugins,
};

export const settings = {
  ...recommended.settings,
};
