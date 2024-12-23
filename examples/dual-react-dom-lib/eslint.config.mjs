// @ts-check

import react from "@eslint-react/eslint-plugin";
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

import TSCONFIG from "./tsconfig.json" with { type: "json" };
import TSCONFIG_NODE from "./tsconfig.node.json" with { type: "json" };

const GLOB_TS = ["**/*.ts", "**/*.tsx"];

export default tseslint.config(
  {
    files: GLOB_TS,
    extends: [
      js.configs.recommended,
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
  // React configuration
  {
    files: TSCONFIG.include,
    ...react.configs["recommended-type-checked"],
  },
  // React Hooks configuration
  {
    files: TSCONFIG.include,
    plugins: {
      // @ts-expect-error - Missing types
      "react-hooks": reactHooks,
    },
    // @ts-ignore - Missing types
    rules: reactHooks.configs.recommended.rules,
  },
);
