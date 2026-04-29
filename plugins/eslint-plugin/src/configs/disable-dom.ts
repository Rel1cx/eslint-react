import type { Linter } from "eslint";
import { rules as domRules } from "./dom";

export const name = "@eslint-react/disable-dom";

export const rules: Linter.RulesRecord = Object.fromEntries(
  Object.entries(domRules).map(([key]) => [key, "off"] as const),
);
