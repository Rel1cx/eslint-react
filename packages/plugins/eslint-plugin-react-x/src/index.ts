import type { ESLint, Linter } from "eslint";

import * as disableConflictEslintPluginReactConfig from "./configs/disable-conflict-eslint-plugin-react";
import * as disableConflictEslintPluginReactHooksConfig from "./configs/disable-conflict-eslint-plugin-react-hooks";
import * as disableExperimentalConfig from "./configs/disable-experimental";
import * as disableTypeCheckedConfig from "./configs/disable-type-checked";
import * as recommendedConfig from "./configs/recommended";
import * as recommendedTypeCheckedConfig from "./configs/recommended-type-checked";
import * as recommendedTypeScriptConfig from "./configs/recommended-typescript";
import * as strictConfig from "./configs/strict";
import * as strictTypeCheckedConfig from "./configs/strict-type-checked";
import * as strictTypeScriptConfig from "./configs/strict-typescript";

import { plugin } from "./plugin";

type ConfigName =
  | "disable-experimental"
  | "disable-type-checked"
  | "disable-conflict-eslint-plugin-react"
  | "disable-conflict-eslint-plugin-react-hooks"
  | "recommended"
  | "recommended-type-checked"
  | "recommended-typescript"
  | "strict"
  | "strict-type-checked"
  | "strict-typescript";

const finalPlugin: ESLint.Plugin & { configs: Record<ConfigName, Linter.Config> } = {
  ...plugin,
  configs: {
    /**
     * Disable experimental rules that might be subject to change in the future
     */
    ["disable-experimental"]: disableExperimentalConfig,
    /**
     * Disable rules that can be enforced by TypeScript
     */
    ["disable-type-checked"]: disableTypeCheckedConfig,
    /**
     * Disable rules in `eslint-plugin-react` that conflict with rules in this plugin
     */
    ["disable-conflict-eslint-plugin-react"]: disableConflictEslintPluginReactConfig,
    /**
     * Disable rules in `eslint-plugin-react-hooks` that conflict with rules in this plugin
     */
    ["disable-conflict-eslint-plugin-react-hooks"]: disableConflictEslintPluginReactHooksConfig,
    /**
     * Enforce rules that are recommended by ESLint React for general purpose React + React DOM projects
     */
    ["recommended"]: recommendedConfig,
    /**
     * Same as the `recommended-typescript` preset but enables additional rules that require type information
     */
    ["recommended-type-checked"]: recommendedTypeCheckedConfig,
    /**
     * Same as the `recommended` preset but disables rules that can be enforced by TypeScript
     */
    ["recommended-typescript"]: recommendedTypeScriptConfig,
    /**
     * More strict version of the `recommended` preset
     */
    ["strict"]: strictConfig,
    /**
     * Same as the `strict-typescript` preset but enables additional rules that require type information
     */
    ["strict-type-checked"]: strictTypeCheckedConfig,
    /**
     * Same as the `strict` preset but disables rules that can be enforced by TypeScript
     */
    ["strict-typescript"]: strictTypeScriptConfig,
  },
};

export default finalPlugin;
