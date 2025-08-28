import type { RulePreset } from "@eslint-react/kit";
import type { CompatibleConfig } from "@eslint-react/shared";

import * as allConfig from "./configs/all";
import { plugin } from "./plugin";

function toFlatConfig(config: CompatibleConfig) {
  return {
    ...config,
    plugins: {
      "react-debug": plugin,
    },
  };
}

function toLegacyConfig({ rules }: { rules: RulePreset }) {
  return {
    plugins: ["react-debug"],
    rules,
  };
}

export default {
  ...plugin,
  configs: {
    ["all"]: toFlatConfig(allConfig),
    ["all-legacy"]: toLegacyConfig(allConfig),
  },
};
