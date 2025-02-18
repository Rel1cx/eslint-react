import type { Linter } from "eslint";

import * as allConfig from "./configs/all";
import { plugin } from "./plugin";

function makeConfig(config: Linter.Config): Linter.Config {
  return {
    ...config,
    plugins: {
      ...config.plugins,
      "react-dom": plugin,
    },
  };
}

function toLegacyConfig({ rules }: Linter.Config): Linter.LegacyConfig {
  return {
    plugins: ["react-debug"],
    rules,
  };
}

export default {
  ...plugin,
  configs: {
    ["all"]: makeConfig(allConfig),
    ["all-legacy"]: toLegacyConfig(allConfig),
  },
};
