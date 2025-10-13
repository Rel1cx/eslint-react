import type { RuleConfig } from "@eslint-react/shared";

import { rules as debugRules } from "./debug";

export const name = "@eslint-react/disable-debug";

export const rules: Record<string, RuleConfig> = Object.fromEntries(
  Object.entries(debugRules).map(([rule]) => [rule, "off"]),
);
