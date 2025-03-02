import type { RulePreset } from "@eslint-react/shared";

export const name = "react-naming-convention/recommended";

export const rules = {
  "react-naming-convention/context-name": "warn",
  "react-naming-convention/use-state": "warn",
} as const satisfies RulePreset;
