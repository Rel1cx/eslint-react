import type { RulePreset } from "@eslint-react/shared";

import * as recommendedConfig from "./configs/recommended";
import * as recommendedTypeCheckedConfig from "./configs/recommended-type-checked";
import * as recommendedTypeScriptConfig from "./configs/recommended-typescript";
import { plugin } from "./plugin";

function makeConfig(config: { name: string; rules: RulePreset }) {
  return {
    ...config,
    plugins: {
      "react-x": plugin,
    },
  };
}

function makeLegacyConfig(config: { rules: RulePreset }) {
  return {
    plugins: ["react-x"],
    rules: config.rules,
  };
}

export default {
  ...plugin,
  configs: {
    ["recommended"]: makeConfig(recommendedConfig),
    ["recommended-legacy"]: makeLegacyConfig(recommendedConfig),
    ["recommended-type-checked"]: makeConfig(recommendedTypeCheckedConfig),
    ["recommended-type-checked-legacy"]: makeLegacyConfig(recommendedTypeCheckedConfig),
    ["recommended-typescript"]: makeConfig(recommendedTypeScriptConfig),
    ["recommended-typescript-legacy"]: makeLegacyConfig(recommendedTypeScriptConfig),
  },
};
