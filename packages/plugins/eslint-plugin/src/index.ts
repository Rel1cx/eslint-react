import { name, version } from "../package.json";

import type { ESLint, Linter } from "eslint";
import reactDomPlugin from "eslint-plugin-react-dom";
import reactJsxPlugin from "eslint-plugin-react-jsx";
import reactNamingConventionPlugin from "eslint-plugin-react-naming-convention";
import reactRscPlugin from "eslint-plugin-react-rsc";
import reactWebApiPlugin from "eslint-plugin-react-web-api";
import reactPlugin from "eslint-plugin-react-x";

import * as allConfig from "./configs/all";
import * as disableConflictEslintPluginReact from "./configs/disable-conflict-eslint-plugin-react";
import * as disableConflictEslintPluginReactHooks from "./configs/disable-conflict-eslint-plugin-react-hooks";
import * as disableDomConfig from "./configs/disable-dom";
import * as disableExperimentalConfig from "./configs/disable-experimental";
import * as disableJsxConfig from "./configs/disable-jsx";
import * as disableRscConfig from "./configs/disable-rsc";
import * as disableTypeCheckedConfig from "./configs/disable-type-checked";
import * as disableWebApiConfig from "./configs/disable-web-api";
import * as domConfig from "./configs/dom";
import * as jsxConfig from "./configs/jsx";
import * as offConfig from "./configs/off";
import * as recommendedConfig from "./configs/recommended";
import * as recommendedTypeCheckedConfig from "./configs/recommended-type-checked";
import * as recommendedTypeScriptConfig from "./configs/recommended-typescript";
import * as rscConfig from "./configs/rsc";
import * as strictConfig from "./configs/strict";
import * as strictTypeCheckedConfig from "./configs/strict-type-checked";
import * as strictTypescriptConfig from "./configs/strict-typescript";
import * as webApiConfig from "./configs/web-api";
import * as xConfig from "./configs/x";

import { padKeysLeft } from "./utils/pad-keys-left";

type ConfigName =
  | "all"
  | "disable-conflict-eslint-plugin-react"
  | "disable-conflict-eslint-plugin-react-hooks"
  | "disable-dom"
  | "disable-jsx"
  | "disable-rsc"
  | "disable-experimental"
  | "disable-type-checked"
  | "disable-web-api"
  | "dom"
  | "jsx"
  | "rsc"
  | "off"
  | "recommended"
  | "recommended-type-checked"
  | "recommended-typescript"
  | "strict"
  | "strict-type-checked"
  | "strict-typescript"
  | "web-api"
  | "x";

const plugin: ESLint.Plugin & {
  /**
   * For more information about each preset, please refer to the documentation.
   * @see https://eslint-react.xyz/docs/presets
   */
  configs: Record<ConfigName, Linter.Config>;
} = {
  meta: {
    name,
    version,
  },
  configs: {
    ["all"]: allConfig,
    ["disable-conflict-eslint-plugin-react"]: disableConflictEslintPluginReact,
    ["disable-conflict-eslint-plugin-react-hooks"]: disableConflictEslintPluginReactHooks,
    ["disable-dom"]: disableDomConfig,
    ["disable-experimental"]: disableExperimentalConfig,
    ["disable-jsx"]: disableJsxConfig,
    ["disable-rsc"]: disableRscConfig,
    ["disable-type-checked"]: disableTypeCheckedConfig,
    ["disable-web-api"]: disableWebApiConfig,
    ["dom"]: domConfig,
    ["jsx"]: jsxConfig,
    ["off"]: offConfig,
    ["recommended"]: recommendedConfig,
    ["recommended-type-checked"]: recommendedTypeCheckedConfig,
    ["recommended-typescript"]: recommendedTypeScriptConfig,
    ["rsc"]: rscConfig,
    ["strict"]: strictConfig,
    ["strict-type-checked"]: strictTypeCheckedConfig,
    ["strict-typescript"]: strictTypescriptConfig,
    ["web-api"]: webApiConfig,
    ["x"]: xConfig,
  },
  rules: {
    ...reactPlugin.rules,
    ...padKeysLeft(reactPlugin.rules, "x-"),
    ...padKeysLeft(reactJsxPlugin.rules, "jsx-"),
    ...padKeysLeft(reactRscPlugin.rules, "rsc-"),
    ...padKeysLeft(reactDomPlugin.rules, "dom-"),
    ...padKeysLeft(reactWebApiPlugin.rules, "web-api-"),
    ...padKeysLeft(reactNamingConventionPlugin.rules, "naming-convention-"),
  },
};

export default plugin;
