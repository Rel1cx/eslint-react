import type { ESLint, Linter } from "eslint";
import * as allConfig from "./configs/all";
import { plugin } from "./plugin";

type ConfigName = "all";

function createConfig(base: { plugins?: Record<string, unknown> } & Record<string, unknown>): Linter.Config {
  return {
    ...base,
    plugins: {
      ...base.plugins,
      // Use a getter to resolve the plugin reference lazily so every config registers the same
      // object as the default export below. Otherwise ESLint reports a "Cannot redefine plugin"
      // error when users register the plugin manually and also extend one of the presets.
      // See https://github.com/Rel1cx/eslint-react/issues/1946
      get ["react-debug"]() {
        return finalPlugin;
      },
    },
  };
}

const finalPlugin: ESLint.Plugin & { configs: Record<ConfigName, Linter.Config> } = {
  ...plugin,
  configs: {
    ["all"]: createConfig(allConfig),
  },
};

export default finalPlugin;
