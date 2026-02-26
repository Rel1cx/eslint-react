import type { ESLint, Linter } from "eslint";

import * as recommendedConfig from "./configs/recommended";
import { plugin } from "./plugin";

type ConfigName = "recommended";

const finalPlugin: ESLint.Plugin & { configs: Record<ConfigName, Linter.Config> } = {
  ...plugin,
  configs: {
    ["recommended"]: recommendedConfig,
  },
};

export default finalPlugin;
