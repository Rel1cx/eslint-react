import type { RuleConfig } from "@eslint-react/shared";

export const name = "react-naming-convention/recommended";

export const rules = {
  "react-naming-convention/context-name": "warn",
  "react-naming-convention/id-name": "warn",
  "react-naming-convention/ref-name": "warn",
  "react-naming-convention/use-state": "warn",
} as const satisfies Record<string, RuleConfig>;
