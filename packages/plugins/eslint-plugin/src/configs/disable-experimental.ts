import type { RuleConfig } from "@eslint-react/shared";

export const name = "@eslint-react/disable-experimental";

export const rules: Record<string, RuleConfig> = {
  "@eslint-react/immutability": "off",
  "@eslint-react/no-duplicate-key": "off",
  "@eslint-react/no-implicit-children": "off",
  "@eslint-react/no-implicit-key": "off",
  "@eslint-react/no-implicit-ref": "off",
  "@eslint-react/no-misused-capture-owner-stack": "off",
  "@eslint-react/no-unnecessary-use-callback": "off",
  "@eslint-react/no-unnecessary-use-memo": "off",
  "@eslint-react/no-unused-props": "off",
  "@eslint-react/refs": "off",
  "@eslint-react/set-state-in-render": "off",
  "@eslint-react/unstable-rules-of-props": "off",
  "@eslint-react/unstable-rules-of-state": "off",

  "@eslint-react/jsx-no-deoptimization": "off",
  "@eslint-react/jsx-no-namespace": "off",

  "@eslint-react/rsc-function-definition": "off",
};
