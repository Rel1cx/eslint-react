import type { Linter } from "eslint";

import * as x from "./x";

export const name = "@eslint-react/web-api";

export const rules = {
  "@eslint-react/web-api-no-leaked-event-listener": "warn",
  "@eslint-react/web-api-no-leaked-interval": "warn",
  "@eslint-react/web-api-no-leaked-resize-observer": "warn",
  "@eslint-react/web-api-no-leaked-timeout": "warn",
} as const satisfies Linter.RulesRecord;

export const settings = {
  ...x.settings,
};
