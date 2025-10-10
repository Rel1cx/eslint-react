import type { RuleConfig } from "@eslint-react/kit";
import { DEFAULT_ESLINT_REACT_SETTINGS } from "@eslint-react/shared";

import { plugin } from "../plugin";

export const name = "react-dom/recommended";

export const rules = {
  "react-dom/no-dangerously-set-innerhtml": "warn",
  "react-dom/no-dangerously-set-innerhtml-with-children": "error",
  "react-dom/no-find-dom-node": "error",
  "react-dom/no-flush-sync": "error",
  "react-dom/no-hydrate": "error",
  "react-dom/no-namespace": "error",
  "react-dom/no-render": "error",
  "react-dom/no-render-return-value": "error",
  "react-dom/no-script-url": "warn",
  "react-dom/no-unsafe-iframe-sandbox": "warn",
  "react-dom/no-use-form-state": "error",
  "react-dom/no-void-elements-with-children": "error",
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  "react-dom": plugin,
};

export const settings = {
  "react-x": DEFAULT_ESLINT_REACT_SETTINGS,
};
