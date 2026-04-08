import { DEFAULT_ESLINT_REACT_SETTINGS } from "@eslint-react/shared";
import type { Linter } from "eslint";

import { plugin } from "../plugin";

export const name = "react-web-api/recommended";

export const rules = {
  "react-web-api/no-leaked-event-listener": "warn",
  "react-web-api/no-leaked-interval": "warn",
  "react-web-api/no-leaked-resize-observer": "warn",
  "react-web-api/no-leaked-timeout": "warn",
} as const satisfies Linter.RulesRecord;

export const plugins = {
  "react-web-api": plugin,
};

export const settings = {
  "react-x": DEFAULT_ESLINT_REACT_SETTINGS,
};
