import type { RuleConfig } from "@eslint-react/shared";
import reactJsx from "eslint-plugin-react-jsx";

export const name = "@eslint-react/jsx";

export const rules = {
  "@eslint-react/jsx-key-before-spread": "warn",
  "@eslint-react/jsx-no-children-prop-with-children": "error",
  "@eslint-react/jsx-no-comment-textnodes": "warn",
  "@eslint-react/jsx-no-namespace": "error",
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  "@eslint-react/jsx": reactJsx,
};
