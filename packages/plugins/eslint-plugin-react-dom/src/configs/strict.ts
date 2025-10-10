import type { RuleConfig } from "@eslint-react/kit";

import * as recommendedConfig from "./recommended";

export const name = "react-dom/strict";

export const rules = {
  ...recommendedConfig.rules,
  "react-dom/no-missing-button-type": "warn",
  "react-dom/no-missing-iframe-sandbox": "warn",
  "react-dom/no-unsafe-target-blank": "warn",
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  ...recommendedConfig.plugins,
};

export const settings = {
  ...recommendedConfig.settings,
};
