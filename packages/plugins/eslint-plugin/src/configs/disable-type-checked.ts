import type { RuleConfig } from "@eslint-react/kit";

export const name = "@eslint-react/disable-type-checked";

export const rules: Record<string, RuleConfig> = {
  "@eslint-react/no-leaked-conditional-rendering": "off",
  "@eslint-react/prefer-read-only-props": "off",
};
