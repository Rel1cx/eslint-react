import type { Linter } from "eslint";

import * as recommendedConfig from "./configs/recommended";
import { plugin } from "./plugin";

function makeConfig(config: Linter.Config): Linter.Config {
  return {
    ...config,
    plugins: {
      ...config.plugins,
      "react-web-api": plugin,
    },
  };
}

function toLegacyConfig({ rules }: Linter.Config): Linter.LegacyConfig {
  return {
    plugins: ["react-web-api"],
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
