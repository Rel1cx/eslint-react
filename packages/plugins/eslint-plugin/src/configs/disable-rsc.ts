import type { Linter } from "eslint";

import { rules as rscRules } from "./rsc";

export const name = "@eslint-react/disable-rsc";

export const rules: Linter.RulesRecord = Object.fromEntries(
  Object.entries(rscRules).map(([key]) => [key, "off"] as const),
);
