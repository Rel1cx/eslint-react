import type { RulePreset } from "@eslint-react/shared";

export const name = "@eslint-react/disable-type-checked";

export const rules: RulePreset = {
  "@eslint-react/no-leaked-conditional-rendering": "off",
  "@eslint-react/prefer-read-only-props": "off",
};
