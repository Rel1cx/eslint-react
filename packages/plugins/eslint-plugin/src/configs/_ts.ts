import type { RuleConfig } from "@eslint-react/kit";

export const rules = {
  "@eslint-react/dom/no-string-style-prop": "off",
  "@eslint-react/dom/no-unknown-property": "off",
  "@eslint-react/jsx-no-duplicate-props": "off",
  "@eslint-react/jsx-no-undef": "off",
  "@eslint-react/jsx-uses-react": "off",
  "@eslint-react/jsx-uses-vars": "off",
} as const satisfies Record<string, RuleConfig>;
