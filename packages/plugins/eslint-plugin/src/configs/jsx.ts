import type { RuleConfig } from "@eslint-react/shared";

export const name = "@eslint-react/jsx";

export const rules = {
  "@eslint-react/jsx-no-children-prop": "warn",
  "@eslint-react/jsx-no-children-prop-with-children": "error",
  "@eslint-react/jsx-no-comment-textnodes": "warn",
  "@eslint-react/jsx-no-key-after-spread": "error",
  "@eslint-react/jsx-no-namespace": "error",
} as const satisfies Record<string, RuleConfig>;
