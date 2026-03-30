import type { RuleConfig } from "@eslint-react/shared";

export const name = "@eslint-react/rsc";

export const rules = {
  "@eslint-react/rsc-function-definition": "error",
} as const satisfies Record<string, RuleConfig>;
