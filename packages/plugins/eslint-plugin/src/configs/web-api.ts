import type { RuleConfig } from "@eslint-react/kit";
import reactWebApi from "eslint-plugin-react-web-api";

import * as dom from "./dom";

export const name = "@eslint-react/web-api";

export const rules = {
  "@eslint-react/web-api/no-leaked-event-listener": "warn",
  "@eslint-react/web-api/no-leaked-interval": "warn",
  "@eslint-react/web-api/no-leaked-resize-observer": "warn",
  "@eslint-react/web-api/no-leaked-timeout": "warn",
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  "@eslint-react/web-api": reactWebApi,
};

export const settings = {
  ...dom.settings,
};
