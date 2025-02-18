import type { RulePreset } from "@eslint-react/shared";
import { DEFAULT_ESLINT_REACT_SETTINGS } from "@eslint-react/shared";

export const name = "react-web-api/recommended";

export const rules = {
  "react-web-api/no-leaked-event-listener": "warn",
  "react-web-api/no-leaked-interval": "warn",
  "react-web-api/no-leaked-resize-observer": "warn",
  "react-web-api/no-leaked-timeout": "warn",
} as const satisfies RulePreset;

export const settings = {
  "react-x": DEFAULT_ESLINT_REACT_SETTINGS,
};
