import type { RulePreset } from "@eslint-react/kit";

import * as recommended from "./recommended";

export const name = "react-x/recommended-typescript";

export const rules = {
  ...recommended.rules,
  "react-x/jsx-no-duplicate-props": "off",
  "react-x/jsx-no-undef": "off",
  "react-x/jsx-uses-react": "off",
  "react-x/jsx-uses-vars": "off",
  "react-x/no-string-style-prop": "off",
} as const satisfies RulePreset;

export const settings = {
  ...recommended.settings,
};
