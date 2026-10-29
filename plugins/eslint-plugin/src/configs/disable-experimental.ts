import type { Linter } from "eslint";

export const name = "@eslint-react/disable-experimental";

export const rules: Linter.RulesRecord = {
  "@eslint-react/globals": "off",
  "@eslint-react/immutability": "off",
  "@eslint-react/no-duplicate-key": "off",
  "@eslint-react/no-implicit-children": "off",
  "@eslint-react/no-implicit-key": "off",
  "@eslint-react/no-implicit-ref": "off",
  "@eslint-react/no-misused-capture-owner-stack": "off",
  "@eslint-react/no-unused-props": "off",
  "@eslint-react/no-unused-state": "off",
  "@eslint-react/refs": "off",
  "@eslint-react/set-state-in-render": "off",
  "@eslint-react/static-components": "off",

  "@eslint-react/rsc-function-definition": "off",

  "@eslint-react/web-api-no-leaked-fetch": "off",
};
