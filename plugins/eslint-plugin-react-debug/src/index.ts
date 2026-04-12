import type { ESLint, Linter } from "eslint";

import * as allConfig from "./configs/all";
import { plugin } from "./plugin";

type ConfigName = "all";

const finalPlugin: ESLint.Plugin & { configs: Record<ConfigName, Linter.Config> } = {
  ...plugin,
  configs: {
    ["all"]: allConfig,
  },
};

export default finalPlugin;
