import eslintJs from "@eslint/js";
import eslintPluginReactx from "eslint-plugin-react-x";
import eslintPluginReactDom from "eslint-plugin-react-dom";
import eslintPluginReactWebApi from "eslint-plugin-react-web-api";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactHooksExtra from "eslint-plugin-react-hooks-extra";
import eslintPluginReactNamingConvention from "eslint-plugin-react-naming-convention";
import tseslint from "typescript-eslint";

import TSCONFIG from "./tsconfig.json" with { type: "json" };
import TSCONFIG_NODE from "./tsconfig.node.json" with { type: "json" };

const GLOB_TS = ["**/*.ts", "**/*.tsx"];

export default tseslint.config(
  {
    files: GLOB_TS,
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
    ],
  },
  // base configuration for browser environment source files
  {
    files: TSCONFIG.include,
    extends: [
      tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // base configuration for node environment source files (*.config.ts, etc.)
  {
    files: TSCONFIG_NODE.include,
    ignores: TSCONFIG_NODE.exclude,
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.node.json",
        projectService: false,
      },
    },
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
      "no-console": "off",
    },
  },
  // react specific configurations
  {
    files: TSCONFIG.include,
    ...eslintPluginReactx.configs["recommended-type-checked"],
  },
  {
    files: TSCONFIG.include,
    ...eslintPluginReactDom.configs.recommended,
  },
  {
    files: TSCONFIG.include,
    ...eslintPluginReactWebApi.configs.recommended,
  },
  {
    files: TSCONFIG.include,
    ...eslintPluginReactHooksExtra.configs.recommended,
  },
  {
    files: TSCONFIG.include,
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    rules: eslintPluginReactHooks.configs.recommended.rules,
  },
);
