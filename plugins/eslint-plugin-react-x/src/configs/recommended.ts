import { DEFAULT_ESLINT_REACT_SETTINGS } from "@eslint-react/shared";
import type { Linter } from "eslint";
import { plugin } from "../plugin";

export const name = "react-x/recommended";

export const rules = {
  "react-x/error-boundaries": "error",
  "react-x/exhaustive-deps": "warn",
  "react-x/no-access-state-in-setstate": "error",
  "react-x/no-array-index-key": "warn",
  "react-x/no-children-count": "warn",
  "react-x/no-children-for-each": "warn",
  "react-x/no-children-map": "warn",
  "react-x/no-children-only": "warn",
  "react-x/no-children-to-array": "warn",
  "react-x/no-clone-element": "warn",
  "react-x/no-component-will-mount": "error",
  "react-x/no-component-will-receive-props": "error",
  "react-x/no-component-will-update": "error",
  "react-x/no-context-provider": "warn",
  "react-x/no-create-ref": "error",
  "react-x/no-direct-mutation-state": "error",
  "react-x/no-forward-ref": "warn",
  "react-x/no-missing-key": "error",
  "react-x/no-nested-component-definitions": "error",
  "react-x/no-nested-lazy-component-declarations": "error",
  "react-x/no-set-state-in-component-did-mount": "warn",
  "react-x/no-set-state-in-component-did-update": "warn",
  "react-x/no-set-state-in-component-will-update": "warn",
  "react-x/no-unnecessary-use-prefix": "warn",
  "react-x/no-unsafe-component-will-mount": "warn",
  "react-x/no-unsafe-component-will-receive-props": "warn",
  "react-x/no-unsafe-component-will-update": "warn",
  "react-x/no-unused-class-component-members": "warn",
  "react-x/no-use-context": "warn",
  "react-x/purity": "warn",
  "react-x/rules-of-hooks": "error",
  "react-x/set-state-in-effect": "warn",
  "react-x/set-state-in-render": "error",
  "react-x/static-components": "error",
  "react-x/unsupported-syntax": "error",
  "react-x/use-memo": "error",
  "react-x/use-state": "warn",
} as const satisfies Linter.RulesRecord;

export const plugins = {
  "react-x": plugin,
};

export const settings = {
  "react-x": DEFAULT_ESLINT_REACT_SETTINGS,
};
