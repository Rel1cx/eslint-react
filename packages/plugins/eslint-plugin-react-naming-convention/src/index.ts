import type { Linter } from "eslint";

import * as recommendedConfig from "./configs/recommended";
import { plugin } from "./plugin";

function makeConfig(config: Linter.Config): Linter.Config {
  return {
    ...config,
    plugins: {
      ...config.plugins,
      "react-naming-convention": plugin,
    },
  };
}

function toLegacyConfig({ rules }: Linter.Config): Linter.LegacyConfig {
  return {
    plugins: ["react-naming-convention"],
    rules,
  };
}

export default {
  ...plugin,
  configs: {
    ["recommended"]: makeConfig(recommendedConfig),
    ["recommended-legacy"]: toLegacyConfig(recommendedConfig),
  },
};
