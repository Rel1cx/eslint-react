import type { RuleConfig } from "@eslint-react/shared";
import * as recommended from "./recommended";

export const name = "react-x/strict";

export const rules = {
  ...recommended.rules,
  "react-x/jsx-no-iife": "error",
  "react-x/no-children-prop": "error",
  "react-x/no-class-component": "error",
  "react-x/no-misused-capture-owner-stack": "error",
  "react-x/no-unnecessary-key": "warn",
  "react-x/no-unnecessary-use-callback": "warn",
  "react-x/no-unnecessary-use-memo": "warn",
  "react-x/no-unstable-context-value": "warn",
  "react-x/no-unstable-default-props": "warn",
  "react-x/no-unused-class-component-members": "warn",
  "react-x/no-unused-state": "warn",
  "react-x/no-useless-fragment": "warn",
  "react-x/prefer-destructuring-assignment": "warn",
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  ...recommended.plugins,
};

export const settings = {
  ...recommended.settings,
};
