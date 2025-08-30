import type { RuleConfig } from "@eslint-react/kit";

import { rules as domRules } from "./dom";

export const name = "@eslint-react/disable-dom";

export const rules: Record<string, RuleConfig> = Object.fromEntries(
  Object.entries(domRules).map(([key]) => [key, "off"] as const),
);
