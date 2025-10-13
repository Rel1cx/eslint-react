/* eslint-disable perfectionist/sort-objects */
import { getConfigAdapters } from "@eslint-react/shared";

import * as recommendedConfig from "./configs/recommended";
import * as recommendedTypeCheckedConfig from "./configs/recommended-type-checked";
import * as recommendedTypeScriptConfig from "./configs/recommended-typescript";
import * as strictConfig from "./configs/strict";
import * as strictTypeCheckedConfig from "./configs/strict-type-checked";
import * as strictTypeScriptConfig from "./configs/strict-typescript";

import { plugin } from "./plugin";

const { toFlatConfig } = getConfigAdapters("react-x", plugin);

export default {
  ...plugin,
  configs: {
    /**
     * Enforce rules that are recommended by ESLint React for general purpose React + React DOM projects
     */
    ["recommended"]: toFlatConfig(recommendedConfig),
    /**
     * Same as the `recommended` preset but disables rules that can be enforced by TypeScript
     */
    ["recommended-typescript"]: toFlatConfig(recommendedTypeScriptConfig),
    /**
     * Same as the `recommended-typescript` preset but enables additional rules that require type information
     */
    ["recommended-type-checked"]: toFlatConfig(recommendedTypeCheckedConfig),
    /**
     * More strict version of the `recommended` preset
     */
    ["strict"]: toFlatConfig(strictConfig),
    /**
     * Same as the `strict` preset but enables additional rules that require type information
     */
    ["strict-typescript"]: toFlatConfig(strictTypeScriptConfig),
    /**
     * Same as the `strict-typescript` preset but enables additional rules that require type information
     */
    ["strict-type-checked"]: toFlatConfig(strictTypeCheckedConfig),
  },
};
