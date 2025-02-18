import type { RulePreset } from "@eslint-react/shared";
import { DEFAULT_ESLINT_REACT_SETTINGS } from "@eslint-react/shared";

export const name = "react-dom/recommended";

export const rules = {
  "react-dom/no-dangerously-set-innerhtml": "warn",
  "react-dom/no-dangerously-set-innerhtml-with-children": "error",
  "react-dom/no-find-dom-node": "error",
  "react-dom/no-missing-button-type": "warn",
  "react-dom/no-missing-iframe-sandbox": "warn",
  "react-dom/no-namespace": "error",
  "react-dom/no-render-return-value": "error",
  "react-dom/no-script-url": "warn",
  "react-dom/no-unknown-property": "warn",
  "react-dom/no-unsafe-iframe-sandbox": "warn",
  "react-dom/no-unsafe-target-blank": "warn",
  "react-dom/no-void-elements-with-children": "warn",
} as const satisfies RulePreset;

export const settings = {
  "react-x": DEFAULT_ESLINT_REACT_SETTINGS,
};
