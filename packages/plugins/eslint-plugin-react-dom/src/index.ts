import type { ESLint, Linter } from "eslint";

import * as recommendedConfig from "./configs/recommended";
import * as strictConfig from "./configs/strict";
import { plugin } from "./plugin";

type ConfigName = "recommended" | "strict";

const finalPlugin: ESLint.Plugin & { configs: Record<ConfigName, Linter.Config> } = {
  ...plugin,
  configs: {
    ["recommended"]: recommendedConfig,
    ["strict"]: strictConfig,
  },
};

export default finalPlugin;
