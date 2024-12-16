// @ts-check

import react from "@eslint-react/eslint-plugin";
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

const GLOB_JS = ["*.{js,jsx,cjs,mjs}", "**/*.{js,jsx,cjs,mjs}"];
const GLOB_TS = ["*.{ts,tsx,cts,mts}", "**/*.{ts,tsx,cts,mts}"];
const GLOB_TEST = [
  "**/*.spec.{ts,tsx,cts,mts}",
  "**/*.test.{ts,tsx,cts,mts}",
  "**/spec.{ts,tsx,cts,mts}",
  "**/test.{ts,tsx,cts,mts}",
];
const GLOB_CONFIG = ["*.config.{ts,tsx,cts,mts}", "**/*.config.{ts,tsx,cts,mts}"];
const GLOB_SCRIPT = ["scripts/**/*.{ts,cts,mts}"];

export default [
  {
    ignores: [
      "node_modules",
      "dist",
      "benchmark",
      "eslint.config.mjs",
      "eslint.config.d.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: GLOB_TS,
    ...react.configs["recommended-type-checked"],
  },
  {
    files: GLOB_TS,
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    files: ["src/**/*.tsx"],
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": "warn",
    },
  },
  {
    files: ["*.config.{js,cjs,mjs,ts,cts,mts}", "*.d.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.node.json",
        projectService: false,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: [...GLOB_TEST, ...GLOB_CONFIG, ...GLOB_SCRIPT],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.node.json",
        projectService: false,
      },
    },
  },
  {
    files: GLOB_JS,
    ...tseslint.configs.disableTypeChecked,
  },
];
