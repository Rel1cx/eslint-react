import type { RulePreset } from "@eslint-react/shared";

import * as recommended from "./recommended";

export const name = "react-x/recommended-typescript";

export const rules = {
  ...recommended.rules,
  "react-x/dom/no-unknown-property": "off",
  "react-x/no-duplicate-jsx-props": "off",
  "react-x/use-jsx-vars": "off",
} as const satisfies RulePreset;

export const settings = {
  ...recommended.settings,
};
