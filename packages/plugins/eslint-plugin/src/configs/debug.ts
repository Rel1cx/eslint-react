import type { RuleConfig } from "@eslint-react/kit";

import reactDebug from "eslint-plugin-react-debug";

export const name = "@eslint-react/debug";

export const rules = {
  "@eslint-react/debug/class-component": "warn",
  "@eslint-react/debug/function-component": "warn",
  "@eslint-react/debug/hook": "warn",
  "@eslint-react/debug/is-from-react": "warn",
  "@eslint-react/debug/jsx": "warn",
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  "@eslint-react/debug": reactDebug,
};
