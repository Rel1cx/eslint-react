import type { RulePreset } from "@eslint-react/kit";

import * as recommendedConfig from "./configs/recommended";
import { plugin } from "./plugin";

function makeConfig(config: { name: string; rules: RulePreset }) {
  return {
    ...config,
    plugins: {
      "react-web-api": plugin,
    },
  };
}

function makeLegacyConfig({ rules }: { rules: RulePreset }) {
  return {
    plugins: ["react-web-api"],
    rules,
  };
}

export default {
  ...plugin,
  configs: {
    ["recommended"]: makeConfig(recommendedConfig),
    ["recommended-legacy"]: makeLegacyConfig(recommendedConfig),
  },
};
