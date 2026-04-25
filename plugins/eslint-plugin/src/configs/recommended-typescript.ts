import type { Linter } from "eslint";

import * as recommended from "./recommended";

export const name = "@eslint-react/recommended-typescript";

export const rules = {
  ...recommended.rules,
} as const satisfies Linter.RulesRecord;

export const settings = {
  ...recommended.settings,
};
