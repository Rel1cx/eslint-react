import type { RulePreset } from "@eslint-react/kit";

import { rules as webApiRules } from "./web-api";

export const name = "@eslint-react/disable-web-api";

export const rules: RulePreset = Object.fromEntries(Object.entries(webApiRules).map(([key]) => [key, "off"] as const));
