import type { RuleConfig } from "@eslint-react/kit";

export const rules = {
  "@eslint-react/no-leaked-conditional-rendering": "warn",
  "@eslint-react/no-unused-props": "warn",
} as const satisfies Record<string, RuleConfig>;
