import type { ESLint, Linter } from "eslint";
import * as recommendedConfig from "./configs/recommended";
import * as strictConfig from "./configs/strict";
import { plugin } from "./plugin";

type ConfigName = "recommended" | "strict";

function createConfig(base: { plugins?: Record<string, unknown> } & Record<string, unknown>): Linter.Config {
  return {
    ...base,
    plugins: {
      ...base.plugins,
      // Use a getter to resolve the plugin reference lazily so every config registers the same
      // object as the default export below. Otherwise ESLint reports a "Cannot redefine plugin"
      // error when users register the plugin manually and also extend one of the presets.
      // See https://github.com/Rel1cx/eslint-react/issues/1946
      get ["react-dom"]() {
        return finalPlugin;
      },
    },
  };
}

const finalPlugin: ESLint.Plugin & { configs: Record<ConfigName, Linter.Config> } = {
  ...plugin,
  configs: {
    ["recommended"]: createConfig(recommendedConfig),
    ["strict"]: createConfig(strictConfig),
  },
};

export default finalPlugin;
