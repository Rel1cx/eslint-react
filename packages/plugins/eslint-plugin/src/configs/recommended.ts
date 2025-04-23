import type { RulePreset } from "@eslint-react/kit";
import reactDebug from "eslint-plugin-react-debug";
import reactNamingConvention from "eslint-plugin-react-naming-convention";

import * as dom from "./dom";
import * as webApi from "./web-api";
import * as x from "./x";

export const name = "@eslint-react/recommended";

export const rules = {
  ...x.rules,
  ...dom.rules,
  ...webApi.rules,
  "@eslint-react/naming-convention/context-name": "warn",
  // "@eslint-react/naming-convention/use-state": "warn",
} as const satisfies RulePreset;

export const plugins = {
  ...x.plugins,
  ...dom.plugins,
  ...webApi.plugins,
  "@eslint-react/debug": reactDebug,
  "@eslint-react/naming-convention": reactNamingConvention,
};

export const settings = {
  ...dom.settings,
};
