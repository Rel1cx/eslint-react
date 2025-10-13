import type { RuleConfig } from "@eslint-react/shared";

import * as recommended from "./recommended";

export const name = "@eslint-react/strict";

export const rules = {
  ...recommended.rules,
  "@eslint-react/jsx-no-iife": "error",
  "@eslint-react/no-children-prop": "warn",
  "@eslint-react/no-class-component": "error",
  "@eslint-react/no-misused-capture-owner-stack": "error",
  "@eslint-react/no-unnecessary-key": "warn",
  "@eslint-react/no-unnecessary-use-callback": "warn",
  "@eslint-react/no-unnecessary-use-memo": "warn",
  "@eslint-react/no-unstable-context-value": "warn",
  "@eslint-react/no-unstable-default-props": "warn",
  "@eslint-react/no-unused-state": "warn",
  "@eslint-react/no-useless-fragment": "warn",
  "@eslint-react/prefer-destructuring-assignment": "warn",

  "@eslint-react/dom/no-missing-button-type": "warn",
  "@eslint-react/dom/no-missing-iframe-sandbox": "warn",
  "@eslint-react/dom/no-unsafe-target-blank": "warn",
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  ...recommended.plugins,
};

export const settings = {
  ...recommended.settings,
};
