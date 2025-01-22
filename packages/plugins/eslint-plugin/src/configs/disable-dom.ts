import type { RulePreset } from "@eslint-react/shared";

import { rules as domRules } from "./dom";

export const name = "@eslint-react/disable-dom";

export const rules: RulePreset = Object.fromEntries(Object.entries(domRules).map(([key]) => [key, "off"] as const));
