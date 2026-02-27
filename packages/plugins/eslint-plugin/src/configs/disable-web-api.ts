import type { RuleConfig } from "@eslint-react/shared";

import { rules as webApiRules } from "./web-api";

export const name = "@eslint-react/disable-web-api";

export const rules: Record<string, RuleConfig> = Object.fromEntries(
  Object.entries(webApiRules).map(([key]) => [key, "off"] as const),
);
