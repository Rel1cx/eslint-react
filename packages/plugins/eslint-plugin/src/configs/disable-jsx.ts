import type { RuleConfig } from "@eslint-react/shared";

import { rules as jsxRules } from "./jsx";

export const name = "@eslint-react/disable-jsx";

export const rules: Record<string, RuleConfig> = Object.fromEntries(
  Object.entries(jsxRules).map(([key]) => [key, "off"] as const),
);
