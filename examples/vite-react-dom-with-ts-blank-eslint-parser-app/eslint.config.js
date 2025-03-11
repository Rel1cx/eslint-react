// @ts-check
import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import tsBlankEslintParser from "ts-blank-eslint-parser";
import tseslint from "typescript-eslint";
import globals from "globals";

import TSCONFIG_APP from "./tsconfig.app.json" with { type: "json" };
import TSCONFIG_NODE from "./tsconfig.node.json" with { type: "json" };

export default tseslint.config(
  // base configuration for browser environment source files
  {
    files: TSCONFIG_APP.include,
    extends: [eslintJs.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsBlankEslintParser,
    },
    rules: {
      "no-unused-vars": "off",
    },
  },
  // base configuration for node environment source files (*.config.js, etc.)
  {
    files: TSCONFIG_NODE.include,
    ignores: TSCONFIG_NODE.exclude,
    extends: [eslintJs.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tsBlankEslintParser,
    },
    rules: {
      "no-console": "off",
    },
  },
  // react specific configurations
  {
    files: TSCONFIG_APP.include,
    extends: [
      eslintReact.configs["recommended-typescript"],
      eslintPluginReactRefresh.configs.recommended,
    ],
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },
);
