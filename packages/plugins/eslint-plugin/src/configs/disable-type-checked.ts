import type { Linter } from "eslint";

export const name = "@eslint-react/disable-type-checked";

export const rules: Linter.RulesRecord = {
  "@eslint-react/no-implicit-children": "off",
  "@eslint-react/no-implicit-key": "off",
  "@eslint-react/no-implicit-ref": "off",
  "@eslint-react/no-leaked-conditional-rendering": "off",
  "@eslint-react/no-unused-props": "off",
};
