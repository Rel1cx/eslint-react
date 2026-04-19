import type { Linter } from "eslint";

import { rules as namingConventionRules } from "./naming-convention";

export const name = "@eslint-react/disable-naming-convention";

export const rules: Linter.RulesRecord = Object.fromEntries(
  Object.entries(namingConventionRules).map(([key]) => [key, "off"] as const),
);
