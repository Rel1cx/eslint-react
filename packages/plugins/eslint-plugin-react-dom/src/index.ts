import type { RulePreset } from "@eslint-react/shared";

import * as recommendedConfig from "./configs/recommended";
import { plugin } from "./plugin";

function makeConfig(config: { name: string; rules: RulePreset }) {
  return {
    ...config,
    plugins: {
      "react-dom": plugin,
    },
  };
}

function makeLegacyConfig({ rules }: { rules: RulePreset }) {
  return {
    plugins: ["react-dom"],
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
