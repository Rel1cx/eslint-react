import type { RulePreset } from "@eslint-react/types";

import * as recommended from "./recommended";

export const name = "@eslint-react/recommended-typescript";

export const rules = {
  ...recommended.rules,
  "@eslint-react/dom/no-unknown-property": "off",
  "@eslint-react/jsx-no-duplicate-props": "off",
  "@eslint-react/jsx-uses-vars": "off",
} as const satisfies RulePreset;

export const plugins = {
  ...recommended.plugins,
};

export const settings = {
  ...recommended.settings,
};
