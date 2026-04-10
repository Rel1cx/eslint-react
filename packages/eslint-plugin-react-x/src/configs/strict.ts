import type { Linter } from "eslint";
import * as recommended from "./recommended";

export const name = "react-x/strict";

export const rules = {
  ...recommended.rules,
  "react-x/no-class-component": "error",
  "react-x/no-misused-capture-owner-stack": "error",
  "react-x/no-unstable-context-value": "warn",
  "react-x/no-unstable-default-props": "warn",
} as const satisfies Linter.RulesRecord;

export const plugins = {
  ...recommended.plugins,
};

export const settings = {
  ...recommended.settings,
};
