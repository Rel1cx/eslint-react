import type { ESLint } from "eslint";
import reactDomPlugin from "eslint-plugin-react-dom";
import reactJsxPlugin from "eslint-plugin-react-jsx";
import reactNamingConventionPlugin from "eslint-plugin-react-naming-convention";
import reactRscPlugin from "eslint-plugin-react-rsc";
import reactWebApiPlugin from "eslint-plugin-react-web-api";
import reactXPlugin from "eslint-plugin-react-x";
import { name, version } from "../package.json";
import { padKeysLeft } from "./utils/pad-keys-left";

const plugin: ESLint.Plugin = {
  meta: {
    name,
    version,
  },
  rules: {
    ...reactXPlugin.rules,
    ...padKeysLeft(reactXPlugin.rules, "x-"),
    ...padKeysLeft(reactJsxPlugin.rules, "jsx-"),
    ...padKeysLeft(reactRscPlugin.rules, "rsc-"),
    ...padKeysLeft(reactDomPlugin.rules, "dom-"),
    ...padKeysLeft(reactWebApiPlugin.rules, "web-api-"),
    ...padKeysLeft(reactNamingConventionPlugin.rules, "naming-convention-"),
  },
};

export default plugin;
