import { DEFAULT_ESLINT_REACT_SETTINGS } from "@eslint-react/shared";
import type { Linter } from "eslint";

import { plugin } from "../plugin";

export const name = "react-jsx/recommended";

export const rules = {
  "react-jsx/no-children-prop": "warn",
  "react-jsx/no-comment-textnodes": "warn",
  "react-jsx/no-key-after-spread": "error",
  "react-jsx/no-leaked-dollar": "warn",
  "react-jsx/no-leaked-semicolon": "warn",
  "react-jsx/no-namespace": "error",
} as const satisfies Linter.RulesRecord;

export const plugins = {
  "react-jsx": plugin,
};

export const settings = {
  "react-x": DEFAULT_ESLINT_REACT_SETTINGS,
};
