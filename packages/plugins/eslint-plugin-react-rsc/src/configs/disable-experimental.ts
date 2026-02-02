import type { RuleConfig } from "@eslint-react/shared";

export const name = "react-x/disable-experimental";

export const rules: Record<string, RuleConfig> = {
  "react-rsc/function-definition": "off",
};
