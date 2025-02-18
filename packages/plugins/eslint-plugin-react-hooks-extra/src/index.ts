import type { Linter } from "eslint";

import * as recommendedConfig from "./configs/recommended";
import { plugin } from "./plugin";

function makeConfig(config: Linter.Config): Linter.Config {
  return {
    ...config,
    plugins: {
      ...config.plugins,
      "react-hooks-extra": plugin,
    },
  };
}

function toLegacyConfig({ rules }: Linter.Config): Linter.LegacyConfig {
  return {
    plugins: ["react-hooks-extra"],
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
