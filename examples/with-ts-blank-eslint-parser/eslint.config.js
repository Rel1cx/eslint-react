import eslintReact from "@eslint-react/eslint-plugin";
import eslintJs from "@eslint/js";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tsBlankEslintParser from "ts-blank-eslint-parser";

import TSCONFIG_APP from "./tsconfig.app.json" with { type: "json" };
import TSCONFIG_NODE from "./tsconfig.node.json" with { type: "json" };

export default defineConfig([
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
      eslintReact.configs.recommended,
      eslintPluginReactHooks.configs.flat["recommended-latest"] ?? [],
      eslintPluginReactRefresh.configs.recommended,
    ],
  },
]);
