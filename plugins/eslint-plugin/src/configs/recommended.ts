import type { Linter } from "eslint";
import * as dom from "./dom";
import * as jsx from "./jsx";
import * as namingConvention from "./naming-convention";
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
  ...namingConvention.rules,
} as const satisfies Linter.RulesRecord;

export const settings = {
  ...x.settings,
};
