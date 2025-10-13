import type { RuleConfig } from "@eslint-react/shared";
import { DEFAULT_ESLINT_REACT_SETTINGS } from "@eslint-react/shared";
import react from "eslint-plugin-react-x";

export const name = "@eslint-react/x";

export const rules = {
  "@eslint-react/jsx-no-comment-textnodes": "warn",
  "@eslint-react/jsx-no-duplicate-props": "warn",
  "@eslint-react/jsx-uses-react": "warn",
  "@eslint-react/jsx-uses-vars": "warn",
  "@eslint-react/no-access-state-in-setstate": "error",
  "@eslint-react/no-array-index-key": "warn",
  "@eslint-react/no-children-count": "warn",
  "@eslint-react/no-children-for-each": "warn",
  "@eslint-react/no-children-map": "warn",
  "@eslint-react/no-children-only": "warn",
  "@eslint-react/no-children-to-array": "warn",
  "@eslint-react/no-clone-element": "warn",
  "@eslint-react/no-component-will-mount": "error",
  "@eslint-react/no-component-will-receive-props": "error",
  "@eslint-react/no-component-will-update": "error",
  "@eslint-react/no-context-provider": "warn",
  "@eslint-react/no-create-ref": "error",
  "@eslint-react/no-default-props": "error",
  "@eslint-react/no-direct-mutation-state": "error",
  "@eslint-react/no-duplicate-key": "error",
  "@eslint-react/no-forward-ref": "warn",
  "@eslint-react/no-implicit-key": "warn",
  "@eslint-react/no-missing-key": "error",
  "@eslint-react/no-nested-component-definitions": "error",
  "@eslint-react/no-nested-lazy-component-declarations": "error",
  "@eslint-react/no-prop-types": "error",
  "@eslint-react/no-redundant-should-component-update": "error",
  "@eslint-react/no-set-state-in-component-did-mount": "warn",
  "@eslint-react/no-set-state-in-component-did-update": "warn",
  "@eslint-react/no-set-state-in-component-will-update": "warn",
  "@eslint-react/no-string-refs": "error",
  "@eslint-react/no-unnecessary-use-prefix": "warn",
  "@eslint-react/no-unsafe-component-will-mount": "warn",
  "@eslint-react/no-unsafe-component-will-receive-props": "warn",
  "@eslint-react/no-unsafe-component-will-update": "warn",
  "@eslint-react/no-unused-class-component-members": "warn",
  "@eslint-react/no-use-context": "warn",
  "@eslint-react/no-useless-forward-ref": "warn",
  "@eslint-react/prefer-use-state-lazy-initialization": "warn",
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  "@eslint-react": react,
};

export const settings = {
  "react-x": DEFAULT_ESLINT_REACT_SETTINGS,
};
