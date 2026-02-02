import { getConfigAdapters } from "@eslint-react/shared";

import * as disableExperimentalConfig from "./configs/disable-experimental";
import * as recommendedConfig from "./configs/recommended";
import * as recommendedTypeScriptConfig from "./configs/recommended-typescript";
import * as strictConfig from "./configs/strict";
import * as strictTypeScriptConfig from "./configs/strict-typescript";

import { plugin } from "./plugin";

const { toFlatConfig } = getConfigAdapters("react-x", plugin);

export default {
  ...plugin,
  configs: {
    /**
     * Disable experimental rules that might be subject to change in the future
     */
    ["disable-experimental"]: toFlatConfig(disableExperimentalConfig),
    /**
     * Enforce rules that are recommended by ESLint React for general purpose React + React DOM projects
     */
    ["recommended"]: toFlatConfig(recommendedConfig),
    /**
     * Same as the `recommended` preset but disables rules that can be enforced by TypeScript
     */
    ["recommended-typescript"]: toFlatConfig(recommendedTypeScriptConfig),
    /**
     * More strict version of the `recommended` preset
     */
    ["strict"]: toFlatConfig(strictConfig),
    /**
     * Same as the `strict` preset but disables rules that can be enforced by TypeScript
     */
    ["strict-typescript"]: toFlatConfig(strictTypeScriptConfig),
  },
};
