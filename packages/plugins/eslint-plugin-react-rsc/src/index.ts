import { identity } from "@eslint-react/eff";
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
    ["recommended"]: recommendedConfig,
    /**
     * Same as the `recommended` preset but disables rules that can be enforced by TypeScript
     */
    ["recommended-typescript"]: recommendedTypeScriptConfig,
    /**
     * More strict version of the `recommended` preset
     */
    ["strict"]: strictConfig,
    /**
     * Same as the `strict` preset but disables rules that can be enforced by TypeScript
     */
    ["strict-typescript"]: strictTypeScriptConfig,
  },
};

export default finalPlugin;
