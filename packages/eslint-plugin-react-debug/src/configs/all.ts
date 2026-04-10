import { DEFAULT_ESLINT_REACT_SETTINGS } from "@eslint-react/shared";
import type { Linter } from "eslint";

import { plugin } from "../plugin";

export const name = "react-debug/all";

export const rules = {
  "react-debug/function-component": "warn",
  "react-debug/hook": "warn",
  "react-debug/is-from-react": "warn",
  "react-debug/is-from-ref": "warn",
  "react-debug/jsx": "warn",
} as const satisfies Linter.RulesRecord;

export const plugins = {
  "react-debug": plugin,
};

export const settings = {
  "react-x": DEFAULT_ESLINT_REACT_SETTINGS,
};
