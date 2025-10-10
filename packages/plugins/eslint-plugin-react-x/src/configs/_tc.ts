import type { RuleConfig } from "@eslint-react/kit";

export const rules = {
  "react-x/no-leaked-conditional-rendering": "warn",
  "react-x/no-unused-props": "warn",
} as const satisfies Record<string, RuleConfig>;
