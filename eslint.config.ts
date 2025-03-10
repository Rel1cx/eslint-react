/* eslint-disable perfectionist/sort-objects */
/* eslint-disable simple-import-sort/imports */
import url from "node:url";

import * as base from "@local/configs/eslint";
import js from "@eslint/js";
import markdown from "@eslint/markdown";
import stylistic from "@stylistic/eslint-plugin";
import configFlatGitignore from "eslint-config-flat-gitignore";
import pluginDeMorgan from "eslint-plugin-de-morgan";
import pluginJsdoc from "eslint-plugin-jsdoc";
import pluginLocal from "@local/eslint-plugin-local";
import pluginPerfectionist from "eslint-plugin-perfectionist";
import pluginRegexp from "eslint-plugin-regexp";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import pluginUnicorn from "eslint-plugin-unicorn";
import pluginVitest from "eslint-plugin-vitest";
import tseslint from "typescript-eslint";

const dirname = url.fileURLToPath(new URL(".", import.meta.url));
const GLOB_JS = ["*.{js,jsx,cjs,mjs}", "**/*.{js,jsx,cjs,mjs}"];
const GLOB_TS = ["*.{ts,tsx,cts,mts}", "**/*.{ts,tsx,cts,mts}"];
const GLOB_MD = ["*.md", "**/*.md"];
const GLOB_TEST = [
  "**/*.spec.{ts,tsx,cts,mts}",
  "**/*.test.{ts,tsx,cts,mts}",
  "**/spec.{ts,tsx,cts,mts}",
  "**/test.{ts,tsx,cts,mts}",
];
// const GLOB_YAML = ["*.{yaml,yml}", "**/*.{yaml,yml}"];
const GLOB_CONFIG = ["*.config.{ts,tsx,cts,mts}", "**/*.config.{ts,tsx,cts,mts}"];
const GLOB_SCRIPT = ["scripts/**/*.{ts,cts,mts}"];
const GLOB_IGNORES = [
  ...configFlatGitignore().ignores,
  ...GLOB_JS,
  "apps",
  "docs",
  "test",
  "examples",
  "**/*.d.ts",
];

const packagesTsConfigs = [
  "packages/*/tsconfig.json",
  "packages/*/*/tsconfig.json",
];

export default tseslint.config(
  { ignores: GLOB_IGNORES },
  {
    files: GLOB_MD,
    extends: [
      markdown.configs.recommended,
    ],
    ignores: [
      "packages/**/docs/**/*.md",
    ],
    language: "markdown/gfm",
    rules: {
      "markdown/no-html": "error",
      "markdown/no-missing-label-refs": "off",
    },
  },
  {
    files: GLOB_TS,
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      pluginDeMorgan.configs.recommended,
      pluginJsdoc.configs["flat/recommended-typescript-error"],
      pluginRegexp.configs["flat/recommended"],
      pluginPerfectionist.configs["recommended-natural"],
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: packagesTsConfigs,
        projectService: true,
        tsconfigRootDir: dirname,
        // warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    plugins: {
      ["@stylistic"]: stylistic,
      ["local"]: pluginLocal,
      ["simple-import-sort"]: pluginSimpleImportSort,
      ["unicorn"]: pluginUnicorn,
    },
  },
  {
    files: GLOB_TS,
    extends: [
      base.typescript,
    ],
    rules: {
      // Part: local rules
      "local/avoid-multiline-template-expression": "warn",
      "local/no-shadow-underscore": "error",
      "local/prefer-eqeq-nullish-comparison": "warn",
    },
  },
  {
    files: [...GLOB_SCRIPT, ...GLOB_CONFIG],
    extends: [
      tseslint.configs.disableTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: false,
        projectService: false,
      },
    },
    rules: {
      "no-console": "off",
    },
  },
  {
    files: GLOB_TEST,
    extends: [
      pluginVitest.configs.recommended,
    ],
    languageOptions: {
      globals: {
        ...pluginVitest.environments.env.globals,
      },
      parserOptions: {
        project: "tsconfig.json",
        projectService: true,
        tsconfigRootDir: dirname,
      },
    },
    plugins: {
      vitest: pluginVitest,
    },
    rules: {
      "@typescript-eslint/no-empty-function": ["error", { allow: ["arrowFunctions"] }],
      "local/avoid-multiline-template-expression": "off",
    },
  },
);
