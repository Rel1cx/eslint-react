import type { Linter } from "eslint";

import * as recommendedConfig from "./recommended";

export const name = "react-jsx/strict";

export const rules = {
  ...recommendedConfig.rules,
  "react-jsx/no-children-prop": "error",
  "react-jsx/no-useless-fragment": "warn",
} as const satisfies Linter.RulesRecord;

export const plugins = {
  ...recommendedConfig.plugins,
};

export const settings = {
  ...recommendedConfig.settings,
};
