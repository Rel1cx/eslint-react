import type { RuleConfig } from "@eslint-react/kit";

import * as dom from "./dom";
import * as x from "./x";

export const name = "@eslint-react/no-deprecated";

export const rules = {
  "@eslint-react/no-component-will-mount": "error",
  "@eslint-react/no-component-will-receive-props": "error",
  "@eslint-react/no-component-will-update": "error",
  "@eslint-react/no-create-ref": "error",
  "@eslint-react/no-forward-ref": "error",

  "@eslint-react/dom/no-find-dom-node": "error",
  "@eslint-react/dom/no-hydrate": "error",
  "@eslint-react/dom/no-render": "error",
  "@eslint-react/dom/no-render-return-value": "error",
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  ...x.plugins,
  ...dom.plugins,
};
