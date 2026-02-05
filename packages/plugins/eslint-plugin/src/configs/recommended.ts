import type { RuleConfig } from "@eslint-react/shared";
import reactHooksExtra from "eslint-plugin-react-hooks-extra";
import reactNamingConvention from "eslint-plugin-react-naming-convention";

import * as dom from "./dom";
import * as rsc from "./rsc";
import * as webApi from "./web-api";
import * as x from "./x";

export const name = "@eslint-react/recommended";

export const rules = {
  ...x.rules,
  ...rsc.rules,
  ...dom.rules,
  ...webApi.rules,
  "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "warn",
  "@eslint-react/naming-convention/context-name": "warn",
  "@eslint-react/naming-convention/ref-name": "warn",
  "@eslint-react/naming-convention/use-state": "warn",
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  ...x.plugins,
  ...rsc.plugins,
  ...dom.plugins,
  ...webApi.plugins,
  "@eslint-react/hooks-extra": reactHooksExtra,
  "@eslint-react/naming-convention": reactNamingConvention,
};

export const settings = {
  ...x.settings,
};
