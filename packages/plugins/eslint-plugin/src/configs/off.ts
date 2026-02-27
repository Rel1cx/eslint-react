import type { RuleConfig } from "@eslint-react/shared";

import { rules as allRules } from "./all";
import { rules as disableTypeCheckedRules } from "./disable-type-checked";

export const name = "@eslint-react/off";

export const rules: Record<string, RuleConfig> = {
  ...Object.fromEntries(Object.entries(allRules).map(([key]) => [key, "off"] as const)),
  ...disableTypeCheckedRules,
};
