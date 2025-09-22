import type { CompatiblePlugin } from "@eslint-react/kit";
import reactDebug from "eslint-plugin-react-debug";
import reactDom from "eslint-plugin-react-dom";
import reactHooksExtra from "eslint-plugin-react-hooks-extra";
import reactNamingConvention from "eslint-plugin-react-naming-convention";
import reactWebApi from "eslint-plugin-react-web-api";
import react from "eslint-plugin-react-x";

import { name, version } from "../package.json";
import * as allConfig from "./configs/all";
import * as debugConfig from "./configs/debug";
import * as disableConflictEslintPluginReact from "./configs/disable-conflict-eslint-plugin-react";
import * as disableDebugConfig from "./configs/disable-debug";
import * as disableDomConfig from "./configs/disable-dom";
import * as disableTypeCheckedConfig from "./configs/disable-type-checked";
import * as disableWebApiConfig from "./configs/disable-web-api";
import * as domConfig from "./configs/dom";
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
    ["all"]: allConfig,
    ["debug"]: debugConfig,
    ["disable-conflict-eslint-plugin-react"]: disableConflictEslintPluginReact,
    ["disable-debug"]: disableDebugConfig,
    ["disable-dom"]: disableDomConfig,
    ["disable-type-checked"]: disableTypeCheckedConfig,
    ["disable-web-api"]: disableWebApiConfig,
    ["dom"]: domConfig,
    ["off"]: offConfig,
    ["recommended"]: recommendedConfig,
    ["recommended-type-checked"]: recommendedTypeCheckedConfig,
    ["recommended-typescript"]: recommendedTypeScriptConfig,
    ["x"]: xConfig,
  },
};
