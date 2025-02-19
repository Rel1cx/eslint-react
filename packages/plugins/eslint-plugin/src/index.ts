import type { RulePreset } from "@eslint-react/shared";
import reactDebug from "eslint-plugin-react-debug";
import reactDom from "eslint-plugin-react-dom";
import reactHooksExtra from "eslint-plugin-react-hooks-extra";
import reactNamingConvention from "eslint-plugin-react-naming-convention";
import reactWebApi from "eslint-plugin-react-web-api";
import react from "eslint-plugin-react-x";

import { name, version } from "../package.json";
import * as allConfig from "./configs/all";
import * as coreConfig from "./configs/core";
import * as debugConfig from "./configs/debug";
import * as disableDebugConfig from "./configs/disable-debug";
import * as disableDomConfig from "./configs/disable-dom";
import * as disableTypeCheckedConfig from "./configs/disable-type-checked";
import * as disableWebApiConfig from "./configs/disable-web-api";
import * as domConfig from "./configs/dom";
import * as offConfig from "./configs/off";
import * as recommendedConfig from "./configs/recommended";
import * as recommendedTypeCheckedConfig from "./configs/recommended-type-checked";
import * as recommendedTypeScriptConfig from "./configs/recommended-typescript";
import { padKeysLeft } from "./utils";

function toLegacyConfig({ rules }: { rules: RulePreset }) {
  return {
    plugins: ["@eslint-react"],
    rules,
  };
}

export default {
  meta: {
    name,
    version,
  },
  configs: {
    ["all"]: allConfig,
    ["all-legacy"]: toLegacyConfig(allConfig),
    ["core"]: coreConfig,
    ["core-legacy"]: toLegacyConfig(coreConfig),
    ["debug"]: debugConfig,
    ["debug-legacy"]: toLegacyConfig(debugConfig),
    ["disable-debug"]: disableDebugConfig,
    ["disable-debug-legacy"]: toLegacyConfig(disableDebugConfig),
    ["disable-dom"]: disableDomConfig,
    ["disable-dom-legacy"]: toLegacyConfig(disableDomConfig),
    ["disable-type-checked"]: disableTypeCheckedConfig,
    ["disable-type-checked-legacy"]: toLegacyConfig(disableTypeCheckedConfig),
    ["disable-web-api"]: disableWebApiConfig,
    ["disable-web-api-legacy"]: toLegacyConfig(disableWebApiConfig),
    ["dom"]: domConfig,
    ["dom-legacy"]: toLegacyConfig(domConfig),
    ["off"]: offConfig,
    ["off-legacy"]: toLegacyConfig(offConfig),
    ["recommended"]: recommendedConfig,
    ["recommended-legacy"]: toLegacyConfig(recommendedConfig),
    ["recommended-type-checked"]: recommendedTypeCheckedConfig,
    ["recommended-type-checked-legacy"]: toLegacyConfig(recommendedTypeCheckedConfig),
    ["recommended-typescript"]: recommendedTypeScriptConfig,
    ["recommended-typescript-legacy"]: toLegacyConfig(recommendedTypeScriptConfig),
    // Part: deprecated presets
    /** @deprecated Use `disable-dom` instead */
    ["off-dom"]: disableDomConfig,
    /** @deprecated Use `disable-dom-legacy` instead */
    ["off-dom-legacy"]: toLegacyConfig(disableDomConfig),
  },
  rules: {
    ...react.rules,
    ...padKeysLeft(reactDom.rules, "dom/"),
    ...padKeysLeft(reactWebApi.rules, "web-api/"),
    ...padKeysLeft(reactHooksExtra.rules, "hooks-extra/"),
    ...padKeysLeft(reactNamingConvention.rules, "naming-convention/"),
    ...padKeysLeft(reactDebug.rules, "debug/"),
  },
} as const;
