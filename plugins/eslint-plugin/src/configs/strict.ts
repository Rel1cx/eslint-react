import type { Linter } from "eslint";
import * as recommended from "./recommended";

export const name = "@eslint-react/strict";

export const rules = {
  ...recommended.rules,

  "@eslint-react/no-class-component": "error",
  "@eslint-react/no-misused-capture-owner-stack": "error",
  "@eslint-react/no-unstable-context-value": "warn",
  "@eslint-react/no-unstable-default-props": "warn",

  "@eslint-react/jsx-no-children-prop": "error",
  "@eslint-react/jsx-no-useless-fragment": "warn",

  "@eslint-react/dom-no-missing-button-type": "warn",
  "@eslint-react/dom-no-missing-iframe-sandbox": "warn",
  "@eslint-react/dom-no-unsafe-target-blank": "warn",
} as const satisfies Linter.RulesRecord;

export const settings = {
  ...recommended.settings,
};
