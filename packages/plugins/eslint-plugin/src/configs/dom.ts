import { DEFAULT_ESLINT_REACT_SETTINGS } from "@eslint-react/shared";
import type { RulePreset } from "@eslint-react/types";
import reactDom from "eslint-plugin-react-dom";

export const name = "@eslint-react/dom";

export const rules = {
  "@eslint-react/dom/no-void-elements-with-children": "warn",
  "@eslint-react/dom/no-dangerously-set-innerhtml": "warn",
  "@eslint-react/dom/no-dangerously-set-innerhtml-with-children": "error",
  "@eslint-react/dom/no-find-dom-node": "error",
  "@eslint-react/dom/no-missing-button-type": "warn",
  "@eslint-react/dom/no-missing-iframe-sandbox": "warn",
  "@eslint-react/dom/no-namespace": "error",
  "@eslint-react/dom/no-render-return-value": "error",
  "@eslint-react/dom/no-script-url": "warn",
  // TODO: Re-enable when the rule is refactored to use the data from the `@types/react` package
  // "@eslint-react/dom/no-unknown-property": "warn",
  "@eslint-react/dom/no-unsafe-iframe-sandbox": "warn",
  "@eslint-react/dom/no-unsafe-target-blank": "warn",
} as const satisfies RulePreset;

export const plugins = {
  "@eslint-react/dom": reactDom,
};

export const settings = {
  "react-x": DEFAULT_ESLINT_REACT_SETTINGS,
};
