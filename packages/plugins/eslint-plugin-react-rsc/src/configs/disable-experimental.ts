import type { RuleConfig } from "@eslint-react/shared";

export const name = "react-rsc/disable-experimental";

export const rules: Record<string, RuleConfig> = {
  "react-rsc/function-definition": "off",
};
