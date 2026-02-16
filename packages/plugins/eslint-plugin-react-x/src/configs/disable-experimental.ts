import type { RuleConfig } from "@eslint-react/shared";

export const name = "react-x/disable-experimental";

export const rules: Record<string, RuleConfig> = {
  "react-x/jsx-key-before-spread": "off",
  "react-x/jsx-no-iife": "off",
  "react-x/no-duplicate-key": "off",
  "react-x/no-implicit-key": "off",
  "react-x/no-misused-capture-owner-stack": "off",
  "react-x/no-unnecessary-key": "off",
  "react-x/no-unnecessary-use-callback": "off",
  "react-x/no-unnecessary-use-memo": "off",
  "react-x/no-unused-props": "off",
  "react-x/prefer-read-only-props": "off",
};
