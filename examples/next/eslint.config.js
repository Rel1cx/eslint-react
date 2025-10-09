import eslintReact from "@eslint-react/eslint-plugin";
import { includeIgnoreFile } from "@eslint/compat";
import eslintJs from "@eslint/js";
import eslintPluginNext from "@next/eslint-plugin-next";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

import TSCONFIG from "./tsconfig.json" with { type: "json" };

const GLOB_TS = ["**/*.ts", "**/*.tsx"];
const GLOB_JS = ["**/*.js", "**/*.jsx"];
const GLOB_APP = ["app/**/*.{js,ts,jsx,tsx}"];
const GLOB_CONFIG = ["**/*.config.{js,mjs,ts,tsx}"];

const gitignore = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
  includeIgnoreFile(gitignore, "Imported .gitignore patterns"),
  {
    files: GLOB_TS,
    extends: [
      eslintJs.configs.recommended,
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
    extends: [
      eslintReact.configs["strict-type-checked"],
      eslintPluginReactRefresh.configs.recommended,
      eslintPluginReactHooks.configs.flat["recommended-latest"] ?? [],
    ],
    plugins: {
      "@next/next": eslintPluginNext,
    },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs["core-web-vitals"].rules,
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
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      "no-undef": "off",
      "no-console": "off",
    },
  },
]);
