// @ts-check

import react from "@eslint-react/eslint-plugin";
import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import gitignore from "eslint-config-flat-gitignore";

import TSCONFIG from "./tsconfig.json" with { type: "json" };

const GLOB_TS = ["**/*.ts", "**/*.tsx"];
const GLOB_JS = ["**/*.js", "**/*.jsx"];
const GLOB_APP = ["app/**/*.{js,ts,jsx,tsx}"];
const GLOB_CONFIG = ["**/*.config.{js,mjs,ts,tsx}"];

export default tseslint.config(
  {
    files: GLOB_TS,
    extends: [
      js.configs.recommended,
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
    files: TSCONFIG.include,
    plugins: {
      "@next/next": next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
    },
  },
  {
    files: GLOB_APP,
    rules: {
      "@typescript-eslint/require-await": "off",
    },
  },
  {
    files: [...GLOB_JS, ...GLOB_CONFIG],
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
      "no-undef": "off",
      "no-console": "off",
    },
  },
  gitignore(),
);
