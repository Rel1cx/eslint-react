import type { RulePreset } from "@eslint-react/shared";

import * as allConfig from "./configs/all";
import { plugin } from "./plugin";

function makeConfig(config: { name: string; rules: RulePreset }) {
  return {
    ...config,
    plugins: {
      "react-debug": plugin,
    },
  };
}

function makeLegacyConfig({ rules }: { rules: RulePreset }) {
  return {
    plugins: ["react-debug"],
    rules,
  };
}

export default {
  ...plugin,
  configs: {
    ["all"]: makeConfig(allConfig),
    ["all-legacy"]: makeLegacyConfig(allConfig),
  },
};
