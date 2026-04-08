import type { Linter } from "eslint";

import { plugin } from "../plugin";

export const name = "react-naming-convention/recommended";

export const rules = {
  "react-naming-convention/context-name": "warn",
  "react-naming-convention/id-name": "warn",
  "react-naming-convention/ref-name": "warn",
} as const satisfies Linter.RulesRecord;

export const plugins = {
  "react-naming-convention": plugin,
};
