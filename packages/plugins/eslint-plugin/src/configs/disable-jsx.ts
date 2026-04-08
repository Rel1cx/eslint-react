import type { Linter } from "eslint";

import { rules as jsxRules } from "./jsx";

export const name = "@eslint-react/disable-jsx";

export const rules: Linter.RulesRecord = Object.fromEntries(
  Object.entries(jsxRules).map(([key]) => [key, "off"] as const),
);
