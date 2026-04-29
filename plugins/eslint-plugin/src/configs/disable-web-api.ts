import type { Linter } from "eslint";
import { rules as webApiRules } from "./web-api";

export const name = "@eslint-react/disable-web-api";

export const rules: Linter.RulesRecord = Object.fromEntries(
  Object.entries(webApiRules).map(([key]) => [key, "off"] as const),
);
