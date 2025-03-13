import type { RulePreset } from "@eslint-react/shared";
import { DEFAULT_ESLINT_REACT_SETTINGS } from "@eslint-react/shared";

export const name = "react-x/recommended";

export const rules = {
  "react-x/no-access-state-in-setstate": "error",
  "react-x/no-array-index-key": "warn",
  "react-x/no-children-count": "warn",
  "react-x/no-children-for-each": "warn",
  "react-x/no-children-map": "warn",
  "react-x/no-children-only": "warn",
  "react-x/no-children-to-array": "warn",
  "react-x/no-clone-element": "warn",
  "react-x/no-comment-textnodes": "warn",
  "react-x/no-component-will-mount": "error",
  "react-x/no-component-will-receive-props": "error",
  "react-x/no-component-will-update": "error",
  "react-x/no-context-provider": "warn",
  "react-x/no-create-ref": "error",
  "react-x/no-default-props": "error",
  "react-x/no-direct-mutation-state": "error",
  "react-x/no-duplicate-jsx-props": "warn",
  "react-x/no-duplicate-key": "warn",
  "react-x/no-forward-ref": "warn",
  "react-x/no-implicit-key": "warn",
  "react-x/no-missing-key": "error",
  "react-x/no-nested-components": "error",
  "react-x/no-prop-types": "error",
  "react-x/no-redundant-should-component-update": "error",
  "react-x/no-set-state-in-component-did-mount": "warn",
  "react-x/no-set-state-in-component-did-update": "warn",
  "react-x/no-set-state-in-component-will-update": "warn",
  "react-x/no-string-refs": "error",
  "react-x/no-unsafe-component-will-mount": "warn",
  "react-x/no-unsafe-component-will-receive-props": "warn",
  "react-x/no-unsafe-component-will-update": "warn",
  "react-x/no-unstable-context-value": "warn",
  "react-x/no-unstable-default-props": "warn",
  "react-x/no-unused-class-component-members": "warn",
  "react-x/no-unused-state": "warn",
  "react-x/no-use-context": "warn",
  "react-x/no-useless-forward-ref": "warn",
  "react-x/use-jsx-vars": "warn",
} as const satisfies RulePreset;

export const settings = {
  "react-x": DEFAULT_ESLINT_REACT_SETTINGS,
};
