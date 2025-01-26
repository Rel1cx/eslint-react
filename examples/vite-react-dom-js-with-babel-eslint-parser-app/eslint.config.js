import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import babelEslintParser from "@babel/eslint-parser";
import globals from "globals";

import JSCONFIG from "./jsconfig.json" with { type: "json" };
import JSCONFIG_NODE from "./jsconfig.node.json" with { type: "json" };

export default [
  // base configuration for browser environment source files
  {
    files: JSCONFIG.include,
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
    rules: {
      ...eslintJs.configs.recommended.rules,
    },
  },
  // base configuration for node environment source files (*.config.js, etc.)
  {
    files: JSCONFIG_NODE.include,
    ignores: JSCONFIG_NODE.exclude,
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
      ...eslintJs.configs.recommended.rules,
      "no-console": "off",
    },
  },
  // React configuration
  {
    files: JSCONFIG.include,
    ...eslintReact.configs.recommended,
  },
  // React Hooks configuration
  {
    files: JSCONFIG.include,
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    rules: eslintPluginReactHooks.configs.recommended.rules,
  },
  // React Refresh configuration
  {
    files: JSCONFIG.include,
    plugins: {
      "react-refresh": eslintPluginReactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": "warn",
    },
  },
];
