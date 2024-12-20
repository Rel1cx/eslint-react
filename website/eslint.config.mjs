import js from "@eslint/js";
import * as mdx from "eslint-plugin-mdx";
import tseslint from "typescript-eslint";
import next from "@next/eslint-plugin-next";
import react from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import gitignore from "eslint-config-flat-gitignore";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const GLOB_TS = ["**/*.{ts,tsx}"];
const GLOB_JS = ["**/*.{js,cjs,mjs}"];
const GLOB_MDX = ["**/*.mdx"];
const GLOB_APP = ["app/**/*.{js,ts,jsx,tsx}"];

export default tseslint.config(
  js.configs.recommended,
  {
    ...mdx.flat,
    files: GLOB_MDX,
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: false,
    }),
  },
  {
    files: GLOB_TS,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...tseslint.configs.strictTypeChecked.rules,
      "no-undef": "off",
    },
  },
  {
    files: [...GLOB_TS, ...GLOB_MDX],
    ...react.configs.recommended,
  },
  {
    files: GLOB_TS,
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    files: GLOB_TS,
    plugins: {
      "@next/next": next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
    },
  },
  {
    files: [...GLOB_TS, ...GLOB_MDX],
    plugins: {
      "simple-import-sort": simpleImportSort,
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
    ignores: ["*.config.mjs"],
  },
);
