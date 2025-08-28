import type { RulePreset } from "@eslint-react/kit";
import type { CompatibleConfig } from "@eslint-react/shared";

import * as recommendedConfig from "./configs/recommended";
import { plugin } from "./plugin";

function toFlatConfig(config: CompatibleConfig) {
  return {
    ...config,
    plugins: {
      "react-hooks-extra": plugin,
    },
  };
}

function toLegacyConfig({ rules }: { rules: RulePreset }) {
  return {
    plugins: ["react-hooks-extra"],
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
