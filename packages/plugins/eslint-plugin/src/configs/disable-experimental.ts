import type { RuleConfig } from "@eslint-react/shared";

export const name = "@eslint-react/disable-experimental";

export const rules: Record<string, RuleConfig> = {
  "@eslint-react/jsx-key-before-spread": "off",
  "@eslint-react/jsx-no-iife": "off",
  "@eslint-react/no-duplicate-key": "off",
  "@eslint-react/no-implicit-key": "off",
  "@eslint-react/no-misused-capture-owner-stack": "off",
  "@eslint-react/no-unnecessary-key": "off",
  "@eslint-react/no-unnecessary-use-callback": "off",
  "@eslint-react/no-unnecessary-use-memo": "off",
  "@eslint-react/no-unnecessary-use-ref": "off",
  "@eslint-react/no-unused-props": "off",
  "@eslint-react/prefer-read-only-props": "off",

  "@eslint-react/rsc/function-definition": "off",
};
