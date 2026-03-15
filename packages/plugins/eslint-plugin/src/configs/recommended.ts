import type { RuleConfig } from "@eslint-react/shared";
import reactNamingConvention from "eslint-plugin-react-naming-convention";

import * as dom from "./dom";
import * as jsx from "./jsx";
import * as rsc from "./rsc";
import * as webApi from "./web-api";
import * as x from "./x";

export const name = "@eslint-react/recommended";

export const rules = {
  ...x.rules,
  ...jsx.rules,
  ...rsc.rules,
  ...dom.rules,
  ...webApi.rules,
  "@eslint-react/naming-convention-context-name": "warn",
  "@eslint-react/naming-convention-id-name": "warn",
  "@eslint-react/naming-convention-ref-name": "warn",
  "@eslint-react/use-state": "warn",
} as const satisfies Record<string, RuleConfig>;

export const settings = {
  ...x.settings,
};
