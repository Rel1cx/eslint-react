import { name, version } from "../package.json";

import type { CompatibleConfig, CompatiblePlugin } from "@eslint-react/shared";
import react from "eslint-plugin-react-x";

import * as allConfig from "./configs/all";
import * as disableConflictEslintPluginReact from "./configs/disable-conflict-eslint-plugin-react";
import * as disableDomConfig from "./configs/disable-dom";
import * as disableTypeCheckedConfig from "./configs/disable-type-checked";
import * as disableWebApiConfig from "./configs/disable-web-api";
import * as domConfig from "./configs/dom";
import * as noDeprecatedConfig from "./configs/no-deprecated";
import * as offConfig from "./configs/off";
import * as recommendedConfig from "./configs/recommended";
import * as recommendedTypeCheckedConfig from "./configs/recommended-type-checked";
import * as recommendedTypeScriptConfig from "./configs/recommended-typescript";
import * as strictConfig from "./configs/strict";
import * as strictTypeCheckedConfig from "./configs/strict-type-checked";
import * as strictTypescriptConfig from "./configs/strict-typescript";
import * as webApiConfig from "./configs/web-api";
import * as xConfig from "./configs/x";

type ConfigName =
  | "all"
  | "disable-conflict-eslint-plugin-react"
  | "disable-dom"
  | "disable-type-checked"
  | "disable-web-api"
  | "dom"
  | "no-deprecated"
  | "off"
  | "recommended"
  | "recommended-type-checked"
  | "recommended-typescript"
  | "strict"
  | "strict-type-checked"
  | "strict-typescript"
  | "web-api"
  | "x";

const plugin: CompatiblePlugin & { configs: Record<ConfigName, CompatibleConfig> } = {
  meta: {
    name,
    version,
  },
  configs: {
    /**
     * Enable all applicable rules from this plugin
     */
    ["all"]: allConfig,
    /**
     * Disable rules in `eslint-plugin-react` that conflict with rules in our plugins
     */
    ["disable-conflict-eslint-plugin-react"]: disableConflictEslintPluginReact,
    /**
     * Disable rules in the `dom` preset
     */
    ["disable-dom"]: disableDomConfig,
    /**
     * Disable rules that require type information
     */
    ["disable-type-checked"]: disableTypeCheckedConfig,
    /**
     * Disable rules in the `web-api` preset
     */
    ["disable-web-api"]: disableWebApiConfig,
    /**
     * Enable rules for `"react-dom"`
     */
    ["dom"]: domConfig,
    /**
     * Enable all non-deprecated rules from the `x` and `dom` presets
     * This preset sets the severity of these rules to `"error"`
     */
    ["no-deprecated"]: noDeprecatedConfig,
    /**
     * Disable all rules in this plugin except for debug rules
     */
    ["off"]: offConfig,
    /**
     * Enforce rules that are recommended by ESLint React for general purpose React + React DOM projects
     * This preset includes the `x`, `dom`, and `web-api` presets
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
    ["strict-typescript"]: strictTypescriptConfig,
    /**
     * Enable rules for interacting with Web APIs
     */
    ["web-api"]: webApiConfig,
    /**
     * Enable rules for `"react"`
     */
    ["x"]: xConfig,
  },
  rules: {
    ...react.rules,
  },
};

export default plugin;
