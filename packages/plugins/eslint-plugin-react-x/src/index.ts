import type { CompatibleConfig } from "@eslint-react/kit";

import * as recommendedConfig from "./configs/recommended";
import * as recommendedTypeCheckedConfig from "./configs/recommended-type-checked";
import * as recommendedTypeScriptConfig from "./configs/recommended-typescript";
import { plugin } from "./plugin";

function toFlatConfig(config: CompatibleConfig) {
  return {
    ...config,
    plugins: {
      "react-x": plugin,
    },
  };
}

function toLegacyConfig({ rules }: CompatibleConfig) {
  return {
    plugins: ["react-x"],
    rules,
  };
}

export default {
  ...plugin,
  configs: {
    ["recommended"]: toFlatConfig(recommendedConfig),
    ["recommended-legacy"]: toLegacyConfig(recommendedConfig),
    ["recommended-type-checked"]: toFlatConfig(recommendedTypeCheckedConfig),
    ["recommended-type-checked-legacy"]: toLegacyConfig(recommendedTypeCheckedConfig),
    ["recommended-typescript"]: toFlatConfig(recommendedTypeScriptConfig),
    ["recommended-typescript-legacy"]: toLegacyConfig(recommendedTypeScriptConfig),
  },
};
