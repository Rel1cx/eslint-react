import type { RuleConfig } from "@eslint-react/shared";
import { DEFAULT_ESLINT_REACT_SETTINGS } from "@eslint-react/shared";

export const name = "react-debug/all";

export const rules = {
  "react-debug/class-component": "warn",
  "react-debug/function-component": "warn",
  "react-debug/hook": "warn",
  "react-debug/is-from-react": "warn",
  "react-debug/is-from-ref": "warn",
  "react-debug/jsx": "warn",
} as const satisfies Record<string, RuleConfig>;

export const settings = {
  "react-x": DEFAULT_ESLINT_REACT_SETTINGS,
};
