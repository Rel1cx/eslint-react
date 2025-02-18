import type { RulePreset } from "@eslint-react/shared";

import * as recommendedConfig from "./configs/recommended";
import { plugin } from "./plugin";

function makeConfig(config: { name: string; rules: RulePreset }) {
  return {
    ...config,
    plugins: {
      "react-naming-convention": plugin,
    },
  };
}

function makeLegacyConfig(config: { rules: RulePreset }) {
  return {
    plugins: ["react-naming-convention"],
    rules: config.rules,
  };
}

export default {
  ...plugin,
  configs: {
    ["recommended"]: makeConfig(recommendedConfig),
    ["recommended-legacy"]: makeLegacyConfig(recommendedConfig),
  },
};
