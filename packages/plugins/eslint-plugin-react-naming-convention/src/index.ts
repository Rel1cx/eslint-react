import type { RulePreset } from "@eslint-react/kit";
import type { CompatibleConfig } from "@eslint-react/shared";

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

function toLegacyConfig({ rules }: { rules: RulePreset }) {
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
