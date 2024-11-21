import type { RulePreset } from "@eslint-react/types";
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

type Config = {
  name: string;
  rules: RulePreset;
};

function makeLegacyConfig<T extends Config>(config: T) {
  const { name: _, ...rest } = config;
  return {
    ...rest,
    plugins: ["@eslint-react"],
  };
}

export default {
  meta: {
    name,
    version,
  },
  configs: {
    ["all"]: allConfig,
    ["core"]: coreConfig,
    ["debug"]: debugConfig,
    ["disable-debug"]: disableDebugConfig,
    ["disable-dom"]: disableDomConfig,
    ["disable-type-checked"]: disableTypeCheckedConfig,
    ["disable-web-api"]: disableWebApiConfig,
    ["dom"]: domConfig,
    ["off"]: offConfig,
    ["recommended"]: recommendedConfig,
    ["recommended-type-checked"]: recommendedTypeCheckedConfig,
    ["recommended-typescript"]: recommendedTypeScriptConfig,
    // Part: legacy presets
    ["all-legacy"]: makeLegacyConfig(allConfig),
    ["core-legacy"]: makeLegacyConfig(coreConfig),
    ["debug-legacy"]: makeLegacyConfig(debugConfig),
    ["disable-debug-legacy"]: makeLegacyConfig(disableDebugConfig),
    ["disable-dom-legacy"]: makeLegacyConfig(disableDomConfig),
    ["disable-type-checked-legacy"]: makeLegacyConfig(disableTypeCheckedConfig),
    ["disable-web-api-legacy"]: makeLegacyConfig(disableWebApiConfig),
    ["dom-legacy"]: makeLegacyConfig(domConfig),
    ["off-legacy"]: makeLegacyConfig(offConfig),
    ["recommended-legacy"]: makeLegacyConfig(recommendedConfig),
    ["recommended-type-checked-legacy"]: makeLegacyConfig(recommendedTypeCheckedConfig),
    ["recommended-typescript-legacy"]: makeLegacyConfig(recommendedTypeScriptConfig),
    // Part: deprecated presets
    /** @deprecated Use `disable-dom` instead */
    ["off-dom"]: disableDomConfig,
    /** @deprecated Use `disable-dom-legacy` instead */
    ["off-dom-legacy"]: makeLegacyConfig(disableDomConfig),
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
