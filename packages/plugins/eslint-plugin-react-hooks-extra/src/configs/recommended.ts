import type { RuleConfig } from "@eslint-react/shared";

export const name = "react-hooks-extra/recommended";

export const rules = {
  "react-hooks-extra/no-direct-set-state-in-use-effect": "warn",
} as const satisfies Record<string, RuleConfig>;
