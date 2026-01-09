import babelEslintParser from "@babel/eslint-parser";
import eslintJs from "@eslint/js";
import eslintPluginReactDebug from "eslint-plugin-react-debug";
import eslintPluginReactDOM from "eslint-plugin-react-dom";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactNamingConvention from "eslint-plugin-react-naming-convention";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import eslintPluginReactWebApi from "eslint-plugin-react-web-api";
import eslintPluginReactX from "eslint-plugin-react-x";
import { defineConfig } from "eslint/config";
import globals from "globals";

import JSCONFIG_APP from "./jsconfig.app.json" with { type: "json" };
import JSCONFIG_NODE from "./jsconfig.node.json" with { type: "json" };

const disableProblematicEslintJsRules = {
  rules: {
    // handled by TypeScript
    "no-dupe-args": "off",
    "no-unused-vars": "off",
  },
};

export default defineConfig(
  // base configuration for browser environment source files
  {
    files: JSCONFIG_APP.include,
    extends: [eslintJs.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: babelEslintParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    },
  },
  // base configuration for node environment source files (*.config.js, etc.)
  {
    files: JSCONFIG_NODE.include,
    ignores: JSCONFIG_NODE.exclude,
    extends: [
      eslintJs.configs.recommended,
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: babelEslintParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ["@babel/preset-env"],
        },
      },
    },
    rules: {
      "no-console": "off",
    },
  },
  // react specific configurations
  {
    files: JSCONFIG_APP.include,
    extends: [
      eslintPluginReactX.configs.recommended,
      eslintPluginReactDOM.configs.recommended,
      eslintPluginReactWebApi.configs.recommended,
      eslintPluginReactNamingConvention.configs.recommended,
      eslintPluginReactRefresh.configs.recommended,
      eslintPluginReactDebug.configs.all,
      eslintPluginReactHooks.configs.flat["recommended-latest"] ?? [],
    ],
  },
  disableProblematicEslintJsRules,
);
