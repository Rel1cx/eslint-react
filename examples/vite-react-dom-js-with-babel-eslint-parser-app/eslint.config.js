import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import babelEslintParser from "@babel/eslint-parser";
import globals from "globals";
import { defineConfig } from "eslint/config";

import JSCONFIG from "./jsconfig.json" with { type: "json" };
import JSCONFIG_NODE from "./jsconfig.node.json" with { type: "json" };

export default defineConfig([
  // base configuration for browser environment source files
  {
    files: JSCONFIG.include,
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
    extends: [eslintJs.configs.recommended],
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
    files: JSCONFIG.include,
    extends: [
      eslintReact.configs.recommended,
      eslintPluginReactRefresh.configs.recommended,
    ],
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },
]);
