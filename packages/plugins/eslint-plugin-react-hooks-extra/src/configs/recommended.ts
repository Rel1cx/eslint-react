import type { RulePreset } from "@eslint-react/shared";

export const name = "react-hooks-extra/recommended";

export const rules = {
  "react-hooks-extra/no-direct-set-state-in-use-effect": "warn",
  "react-hooks-extra/no-use-in-try-catch": "error",
  "react-hooks-extra/no-useless-custom-hooks": "warn",
  "react-hooks-extra/prefer-use-state-lazy-initialization": "warn",
} as const satisfies RulePreset;
