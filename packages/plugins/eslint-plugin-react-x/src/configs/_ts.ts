import type { RuleConfig } from "@eslint-react/kit";

export const rules = {
  "react-x/jsx-no-duplicate-props": "off",
  "react-x/jsx-no-undef": "off",
  "react-x/jsx-uses-react": "off",
  "react-x/jsx-uses-vars": "off",
} as const satisfies Record<string, RuleConfig>;
