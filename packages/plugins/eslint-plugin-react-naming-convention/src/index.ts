import type { RuleConfig } from "@eslint-react/kit";
import type { CompatibleConfig } from "@eslint-react/kit";

import * as recommendedConfig from "./configs/recommended";
import { plugin } from "./plugin";

function toFlatConfig(config: CompatibleConfig) {
  return {
    ...config,
    plugins: {
      "react-naming-convention": plugin,
    },
  };
}

function toLegacyConfig({ rules }: CompatibleConfig) {
  return {
    plugins: ["react-naming-convention"],
    rules,
  };
}

export default {
  ...plugin,
  configs: {
    ["recommended"]: toFlatConfig(recommendedConfig),
    ["recommended-legacy"]: toLegacyConfig(recommendedConfig),
  },
};
