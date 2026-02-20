import type { RuleConfig } from "@eslint-react/shared";

export const name = "@eslint-react/disable-experimental";

export const rules: Record<string, RuleConfig> = {
  "@eslint-react/exhaustive-deps": "off",
  "@eslint-react/jsx-key-before-spread": "off",
  "@eslint-react/no-duplicate-key": "off",
  "@eslint-react/no-implicit-key": "off",
  "@eslint-react/no-misused-capture-owner-stack": "off",
  "@eslint-react/no-unnecessary-use-callback": "off",
  "@eslint-react/no-unnecessary-use-memo": "off",
  "@eslint-react/no-unused-props": "off",
  "@eslint-react/prefer-read-only-props": "off",
  "@eslint-react/refs": "off",
  "@eslint-react/rules-of-hooks": "off",
  "@eslint-react/set-state-in-render": "off",

  "@eslint-react/rsc/function-definition": "off",
};
