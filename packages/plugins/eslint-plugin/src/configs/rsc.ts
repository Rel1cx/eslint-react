import type { RuleConfig } from "@eslint-react/shared";
import reactRsc from "eslint-plugin-react-rsc";

export const name = "@eslint-react/rsc";

export const rules = {
  "@eslint-react/rsc/function-definition": "error",
} as const satisfies Record<string, RuleConfig>;

export const plugins = {
  "@eslint-react/rsc": reactRsc,
};
