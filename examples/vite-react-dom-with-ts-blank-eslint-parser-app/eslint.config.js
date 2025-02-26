// @ts-check
import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import tsBlankEslintParser from "ts-blank-eslint-parser";
import tseslint from "typescript-eslint";
import globals from "globals";
import { isInEditorEnv } from "@eslint-react/shared";

import TSCONFIG from "./tsconfig.json" with { type: "json" };
import TSCONFIG_NODE from "./tsconfig.node.json" with { type: "json" };

function getOptimalParserConfig(project = "tsconfig.json") {
  switch (true) {
    case isInEditorEnv():
    case process.argv.includes("--fix"):
      return {
        parser: tseslint.parser,
        parserOptions: {
          project,
          tsconfigRootDir: import.meta.dirname,
        },
      };
  }
  return { parser: tsBlankEslintParser };
}

export default [
  // base configuration for browser environment source files
  {
    files: TSCONFIG.include,
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      ...getOptimalParserConfig(),
    },
    rules: {
      ...eslintJs.configs.recommended.rules,
    },
  },
  // base configuration for node environment source files (*.config.js, etc.)
  {
    files: TSCONFIG_NODE.include,
    ignores: TSCONFIG_NODE.exclude,
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ...getOptimalParserConfig("tsconfig.node.json"),
    },
    rules: {
      ...eslintJs.configs.recommended.rules,
      "no-console": "off",
    },
  },
  // React configuration
  {
    files: TSCONFIG.include,
    ...eslintReact.configs["recommended-typescript"],
  },
  // React Hooks configuration
  {
    files: TSCONFIG.include,
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    rules: eslintPluginReactHooks.configs.recommended.rules,
  },
  // React Refresh configuration
  {
    files: TSCONFIG.include,
    plugins: {
      "react-refresh": eslintPluginReactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": "warn",
    },
  },
];
