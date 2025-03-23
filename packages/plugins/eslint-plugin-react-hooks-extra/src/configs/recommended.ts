import type { RulePreset } from "@eslint-react/kit";

export const name = "react-hooks-extra/recommended";

export const rules = {
  "react-hooks-extra/no-direct-set-state-in-use-effect": "warn",
  "react-hooks-extra/no-unnecessary-use-prefix": "warn",
} as const satisfies RulePreset;
