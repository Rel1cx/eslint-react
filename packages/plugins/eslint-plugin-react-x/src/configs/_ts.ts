import type { RuleConfig } from "@eslint-react/shared";

/**
 * Disables rules that are already handled by TypeScript
 */
export const rules = {
  "react-x/jsx-no-duplicate-props": "off",
} as const satisfies Record<string, RuleConfig>;
