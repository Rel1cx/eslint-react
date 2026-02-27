import type { RuleConfig } from "@eslint-react/shared";
import reactDom from "eslint-plugin-react-dom";

export const name = "@eslint-react/dom";

export const rules = {
  "@eslint-react/dom/no-dangerously-set-innerhtml": "warn",
  "@eslint-react/dom/no-dangerously-set-innerhtml-with-children": "error",
  "@eslint-react/dom/no-find-dom-node": "error",
  "@eslint-react/dom/no-flush-sync": "error",
  "@eslint-react/dom/no-hydrate": "error",
  "@eslint-react/dom/no-namespace": "error",
  "@eslint-react/dom/no-render": "error",
  "@eslint-react/dom/no-render-return-value": "error",
  "@eslint-react/dom/no-script-url": "warn",
  "@eslint-react/dom/no-unsafe-iframe-sandbox": "warn",
  "@eslint-react/dom/no-use-form-state": "error",
  "@eslint-react/dom/no-void-elements-with-children": "error",
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  "@eslint-react/dom": reactDom,
};
