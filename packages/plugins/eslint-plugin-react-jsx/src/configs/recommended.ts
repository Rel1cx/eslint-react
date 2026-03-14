import type { RuleConfig } from "@eslint-react/shared";
import { DEFAULT_ESLINT_REACT_SETTINGS } from "@eslint-react/shared";

import { plugin } from "../plugin";

export const name = "react-jsx/recommended";

export const rules = {
  "react-jsx/key-before-spread": "warn",
  "react-jsx/no-children-prop": "warn",
  "react-jsx/no-comment-textnodes": "warn",
  "react-jsx/no-namespace": "error",
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  "react-jsx": plugin,
};

export const settings = {
  "react-x": DEFAULT_ESLINT_REACT_SETTINGS,
};
