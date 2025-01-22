import type { RulePreset } from "@eslint-react/shared";

import { rules as debugRules } from "./debug";

export const name = "@eslint-react/disable-debug";

export const rules: RulePreset = Object.fromEntries(Object.entries(debugRules).map(([rule]) => [rule, "off"]));
