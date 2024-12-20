// @ts-check

import react from "@eslint-react/eslint-plugin";
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

import TSCONFIG from "./tsconfig.json" with { type: "json" };
import TSCONFIG_NODE from "./tsconfig.node.json" with { type: "json" };

const GLOB_TS = ["**/*.ts", "**/*.tsx"];

export default tseslint.config(
  js.configs.recommended,
  {
    files: GLOB_TS,
    extends: [
      tseslint.configs.recommended,
    ],
  },
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
  {
    files: TSCONFIG.include,
    ...react.configs["recommended-type-checked"],
  },
  {
    files: TSCONFIG.include,
    plugins: {
      // @ts-expect-error - Missing types
      "react-hooks": reactHooks,
    },
    // @ts-ignore - Missing types
    rules: reactHooks.configs.recommended.rules,
  },
  {
    files: TSCONFIG.include,
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": "warn",
    },
  },
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
  {
    ignores: [
      "node_modules",
      "dist",
      "benchmark",
      "eslint.config.mjs",
      "eslint.config.d.ts",
    ],
  },
);
