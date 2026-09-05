import type { ESLint, Linter } from "eslint";
import * as disableExperimentalConfig from "./configs/disable-experimental";
import * as recommendedConfig from "./configs/recommended";
import * as recommendedTypeScriptConfig from "./configs/recommended-typescript";
import * as strictConfig from "./configs/strict";
import * as strictTypeScriptConfig from "./configs/strict-typescript";
import { plugin } from "./plugin";

type ConfigName =
  | "disable-experimental"
  | "recommended"
  | "recommended-typescript"
  | "strict"
  | "strict-typescript";

function createConfig(base: { plugins?: Record<string, unknown> } & Record<string, unknown>): Linter.Config {
  return {
    ...base,
    plugins: {
      ...base.plugins,
      // Use a getter to resolve the plugin reference lazily so every config registers the same
      // object as the default export below. Otherwise ESLint reports a "Cannot redefine plugin"
      // error when users register the plugin manually and also extend one of the presets.
      // See https://github.com/Rel1cx/eslint-react/issues/1946
      get ["react-rsc"]() {
        return finalPlugin;
      },
    },
  };
}

const finalPlugin: ESLint.Plugin & { configs: Record<ConfigName, Linter.Config> } = {
  ...plugin,
  configs: {
    /**
     * Disable experimental rules that might be subject to change in the future
     */
    ["disable-experimental"]: disableExperimentalConfig,
    /**
     * Enforce rules that are recommended by ESLint React for general purpose React + React DOM projects
     */
    ["recommended"]: createConfig(recommendedConfig),
    /**
     * Same as the `recommended` preset but disables rules that can be enforced by TypeScript
     */
    ["recommended-typescript"]: createConfig(recommendedTypeScriptConfig),
    /**
     * More strict version of the `recommended` preset
     */
    ["strict"]: createConfig(strictConfig),
    /**
     * Same as the `strict` preset but disables rules that can be enforced by TypeScript
     */
    ["strict-typescript"]: createConfig(strictTypeScriptConfig),
  },
};

export default finalPlugin;
