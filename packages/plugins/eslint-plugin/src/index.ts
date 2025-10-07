import { name, version } from "../package.json";

import type { CompatiblePlugin } from "@eslint-react/kit";
import reactDebug from "eslint-plugin-react-debug";
import reactDom from "eslint-plugin-react-dom";
import reactHooksExtra from "eslint-plugin-react-hooks-extra";
import reactNamingConvention from "eslint-plugin-react-naming-convention";
import reactWebApi from "eslint-plugin-react-web-api";
import react from "eslint-plugin-react-x";

import * as allConfig from "./configs/all";
import * as debugConfig from "./configs/debug";
import * as disableConflictEslintPluginReact from "./configs/disable-conflict-eslint-plugin-react";
import * as disableDebugConfig from "./configs/disable-debug";
import * as disableDomConfig from "./configs/disable-dom";
import * as disableTypeCheckedConfig from "./configs/disable-type-checked";
import * as disableWebApiConfig from "./configs/disable-web-api";
import * as domConfig from "./configs/dom";
import * as noDeprecatedConfig from "./configs/no-deprecated";
import * as offConfig from "./configs/off";
import * as recommendedConfig from "./configs/recommended";
import * as recommendedTypeCheckedConfig from "./configs/recommended-type-checked";
import * as recommendedTypeScriptConfig from "./configs/recommended-typescript";
import * as xConfig from "./configs/x";
import { padKeysLeft } from "./utils";

const plugin: CompatiblePlugin = {
  meta: {
    name,
    version,
  },
  rules: {
    ...react.rules,
    ...padKeysLeft(reactDom.rules, "dom/"),
    ...padKeysLeft(reactWebApi.rules, "web-api/"),
    ...padKeysLeft(reactHooksExtra.rules, "hooks-extra/"),
    ...padKeysLeft(reactNamingConvention.rules, "naming-convention/"),
    ...padKeysLeft(reactDebug.rules, "debug/"),
  },
};

export default {
  ...plugin,
  configs: {
    /**
     * Enable all rules in this plugin
     */
    ["all"]: allConfig,
    /**
     * Enable debug rules
     */
    ["debug"]: debugConfig,
    /**
     * Disable rules in `eslint-plugin-react` that conflict with rules in our plugins
     */
    ["disable-conflict-eslint-plugin-react"]: disableConflictEslintPluginReact,
    /**
     * Disable debug rules
     */
    ["disable-debug"]: disableDebugConfig,
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
     * Enable rules for `"react"`
     */
    ["x"]: xConfig,
  },
};
