import type { RulePreset } from "@eslint-react/types";
import reactDebug from "eslint-plugin-react-debug";
import reactHooksExtra from "eslint-plugin-react-hooks-extra";
import reactNamingConvention from "eslint-plugin-react-naming-convention";
import reactWebApi from "eslint-plugin-react-web-api";

import * as core from "./core";
import * as dom from "./dom";

export const name = "@eslint-react/recommended";

export const rules = {
  ...core.rules,
  ...dom.rules,
  "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "warn",
  "@eslint-react/hooks-extra/no-redundant-custom-hook": "warn",
  "@eslint-react/hooks-extra/prefer-use-state-lazy-initialization": "warn",
  "@eslint-react/web-api/no-leaked-event-listener": "warn",
  "@eslint-react/web-api/no-leaked-interval": "warn",
  "@eslint-react/web-api/no-leaked-resize-observer": "warn",
  "@eslint-react/web-api/no-leaked-timeout": "warn",
} as const satisfies RulePreset;

export const plugins = {
  ...core.plugins,
  ...dom.plugins,
  "@eslint-react/debug": reactDebug,
  "@eslint-react/hooks-extra": reactHooksExtra,
  "@eslint-react/naming-convention": reactNamingConvention,
  "@eslint-react/web-api": reactWebApi,
};

export const settings = {
  ...dom.settings,
};
