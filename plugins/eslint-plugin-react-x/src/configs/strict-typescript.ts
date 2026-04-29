import type { Linter } from "eslint";
import * as strict from "./strict";

export const name = "react-x/strict-typescript";

export const rules = {
  ...strict.rules,
} as const satisfies Linter.RulesRecord;

export const plugins = {
  ...strict.plugins,
};

export const settings = {
  ...strict.settings,
};
