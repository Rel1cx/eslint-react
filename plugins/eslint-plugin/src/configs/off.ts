import type { Linter } from "eslint";
import { rules as allRules } from "./all";
import { rules as disableTypeCheckedRules } from "./disable-type-checked";

export const name = "@eslint-react/off";

export const rules: Linter.RulesRecord = {
  ...Object.fromEntries(Object.entries(allRules).map(([key]) => [key, "off"] as const)),
  ...disableTypeCheckedRules,
};
