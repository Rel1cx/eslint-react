import type { RulePreset } from "@eslint-react/types";
import reactDebug from "eslint-plugin-react-debug";
import reactHooksExtra from "eslint-plugin-react-hooks-extra";
import reactNamingConvention from "eslint-plugin-react-naming-convention";

import * as core from "./core";
import * as dom from "./dom";
import * as webApi from "./web-api";

export const name = "@eslint-react/recommended";

export const rules = {
  ...core.rules,
  ...dom.rules,
  ...webApi.rules,
  "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "warn",
  "@eslint-react/hooks-extra/no-useless-custom-hooks": "warn",
  "@eslint-react/hooks-extra/prefer-use-state-lazy-initialization": "warn",
} as const satisfies RulePreset;

export const plugins = {
  ...core.plugins,
  ...dom.plugins,
  ...webApi.plugins,
  "@eslint-react/debug": reactDebug,
  "@eslint-react/hooks-extra": reactHooksExtra,
  "@eslint-react/naming-convention": reactNamingConvention,
};

export const settings = {
  ...dom.settings,
};
