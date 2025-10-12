import type { RuleConfig } from "@eslint-react/kit";

export const name = "react-x/disable-type-checked";

export const rules: Record<string, RuleConfig> = {
  "react-x/no-leaked-conditional-rendering": "off",
  "react-x/no-unused-props": "off",
  "react-x/prefer-read-only-props": "off",
};
