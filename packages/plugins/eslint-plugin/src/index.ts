import type { ESLint, Linter } from "eslint";

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

import plugin from "./plugin";

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

function createConfig(base: { plugins?: Record<string, unknown> } & Record<string, unknown>): Linter.Config {
  return {
    ...base,
    plugins: {
      ...base.plugins,
      "@eslint-react": plugin,
    },
  };
}

const finalPlugin: ESLint.Plugin & {
  /**
   * For more information about each preset, please refer to the documentation.
   * @see https://eslint-react.xyz/docs/presets
   */
  configs: Record<ConfigName, Linter.Config>;
} = {
  ...plugin,
  configs: {
    ["all"]: createConfig(allConfig),
    ["disable-conflict-eslint-plugin-react"]: createConfig(disableConflictEslintPluginReact),
    ["disable-conflict-eslint-plugin-react-hooks"]: createConfig(disableConflictEslintPluginReactHooks),
    ["disable-dom"]: createConfig(disableDomConfig),
    ["disable-experimental"]: createConfig(disableExperimentalConfig),
    ["disable-jsx"]: createConfig(disableJsxConfig),
    ["disable-rsc"]: createConfig(disableRscConfig),
    ["disable-type-checked"]: createConfig(disableTypeCheckedConfig),
    ["disable-web-api"]: createConfig(disableWebApiConfig),
    ["dom"]: createConfig(domConfig),
    ["jsx"]: createConfig(jsxConfig),
    ["off"]: createConfig(offConfig),
    ["recommended"]: createConfig(recommendedConfig),
    ["recommended-type-checked"]: createConfig(recommendedTypeCheckedConfig),
    ["recommended-typescript"]: createConfig(recommendedTypeScriptConfig),
    ["rsc"]: createConfig(rscConfig),
    ["strict"]: createConfig(strictConfig),
    ["strict-type-checked"]: createConfig(strictTypeCheckedConfig),
    ["strict-typescript"]: createConfig(strictTypescriptConfig),
    ["web-api"]: createConfig(webApiConfig),
    ["x"]: createConfig(xConfig),
  },
};

export default finalPlugin;
