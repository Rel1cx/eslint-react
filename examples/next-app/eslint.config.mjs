import js from "@eslint/js";
import tseslint from "typescript-eslint";
import next from "@next/eslint-plugin-next";
import react from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import gitignore from "eslint-config-flat-gitignore";

const GLOB_TS = ["**/*.{ts,tsx}"];
const GLOB_JS = ["**/*.{js,cjs,mjs}"];
const GLOB_APP = ["app/**/*.{js,ts,jsx,tsx}"];
const GLOB_CONFIG = ["**/*.config.{js,mjs,cjs,ts,tsx}"];

export default tseslint.config(
  js.configs.recommended,
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
    files: GLOB_TS,
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
    files: GLOB_APP,
    rules: {
      "@typescript-eslint/require-await": "off",
    },
  },
  {
    files: [...GLOB_JS, ...GLOB_CONFIG],
    extends: [
      tseslint.configs.disableTypeChecked,
    ],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  gitignore(),
);
