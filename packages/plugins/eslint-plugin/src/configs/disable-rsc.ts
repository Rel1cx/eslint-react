import type { RuleConfig } from "@eslint-react/shared";

import { rules as rscRules } from "./rsc";

export const name = "@eslint-react/disable-rsc";

export const rules: Record<string, RuleConfig> = Object.fromEntries(
  Object.entries(rscRules).map(([key]) => [key, "off"] as const),
);
