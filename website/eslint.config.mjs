// ts-check

import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import eslintPluginMdx from "eslint-plugin-mdx";
import eslintPluginNext from "@next/eslint-plugin-next";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";
import gitignore from "eslint-config-flat-gitignore";

const GLOB_TS = ["**/*.{ts,tsx}"];
const GLOB_JS = ["**/*.{js,cjs,mjs}"];
const GLOB_MDX = ["**/*.mdx"];
const GLOB_APP = ["app/**/*.{js,ts,jsx,tsx}"];
const GLOB_CONFIG = ["**/*.config.{js,mjs,cjs,ts,tsx}"];

export default tseslint.config(
  eslintJs.configs.recommended,
  {
    ...eslintPluginMdx.flat,
    files: GLOB_MDX,
    processor: eslintPluginMdx.createRemarkProcessor({
      lintCodeBlocks: false,
    }),
  },
  {
    files: GLOB_TS,
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
    files: [...GLOB_TS, ...GLOB_MDX],
    ...eslintReact.configs.recommended,
  },
  {
    files: GLOB_TS,
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    rules: eslintPluginReactHooks.configs.recommended.rules,
  },
  {
    files: GLOB_TS,
    plugins: {
      "@next/next": eslintPluginNext,
    },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    files: [...GLOB_TS, ...GLOB_MDX],
    plugins: {
      "simple-import-sort": eslintPluginSimpleImportSort,
    },
    rules: {
      "simple-import-sort/exports": "warn",
      "simple-import-sort/imports": "warn",
    },
  },
  {
    files: GLOB_APP,
    rules: {
      "@typescript-eslint/require-await": "off",
    },
  },
  {
    files: [...GLOB_JS, ...GLOB_MDX],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: GLOB_JS,
    rules: {
      "no-undef": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  gitignore(),
  {
    ignores: GLOB_CONFIG,
  },
);
