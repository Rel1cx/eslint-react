import type { Linter } from "eslint";

import * as ts from "./_ts";
import * as recommended from "./recommended";

export const name = "@eslint-react/recommended-typescript";

export const rules = {
  ...recommended.rules,
  ...ts.rules,
} as const satisfies Linter.RulesRecord;

export const settings = {
  ...recommended.settings,
};
