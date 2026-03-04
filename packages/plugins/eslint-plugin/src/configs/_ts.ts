import type { RuleConfig } from "@eslint-react/shared";

/**
 * Disables rules that are already handled by TypeScript
 */
export const rules = {
  "@eslint-react/dom/no-string-style-prop": "off",
  "@eslint-react/dom/no-unknown-property": "off",
  "@eslint-react/jsx-no-duplicate-props": "off",
} as const satisfies Record<string, RuleConfig>;
