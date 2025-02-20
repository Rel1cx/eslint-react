import type { RulePreset } from "@eslint-react/shared";

import * as recommendedConfig from "./configs/recommended";
import { plugin } from "./plugin";

function makeConfig(config: { name: string; rules: RulePreset }) {
  return {
    ...config,
    plugins: {
      "react-hooks-extra": plugin,
    },
  };
}

function makeLegacyConfig({ rules }: { rules: RulePreset }) {
  return {
    plugins: ["react-hooks-extra"],
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
