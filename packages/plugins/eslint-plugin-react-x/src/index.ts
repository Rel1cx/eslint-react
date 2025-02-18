import type { Linter } from "eslint";

import * as recommendedConfig from "./configs/recommended";
import * as recommendedTypeCheckedConfig from "./configs/recommended-type-checked";
import * as recommendedTypeScriptConfig from "./configs/recommended-typescript";
import { plugin } from "./plugin";

function makeConfig(config: Linter.Config): Linter.Config {
  return {
    ...config,
    plugins: {
      ...config.plugins,
      "react-x": plugin,
    },
  };
}

function toLegacyConfig({ rules }: Linter.Config): Linter.LegacyConfig {
  return {
    plugins: ["react-x"],
    rules,
  };
}

export default {
  ...plugin,
  configs: {
    ["recommended"]: makeConfig(recommendedConfig),
    ["recommended-legacy"]: toLegacyConfig(recommendedConfig),
    ["recommended-type-checked"]: makeConfig(recommendedTypeCheckedConfig),
    ["recommended-type-checked-legacy"]: toLegacyConfig(recommendedTypeCheckedConfig),
    ["recommended-typescript"]: makeConfig(recommendedTypeScriptConfig),
    ["recommended-typescript-legacy"]: toLegacyConfig(recommendedTypeScriptConfig),
  },
};
