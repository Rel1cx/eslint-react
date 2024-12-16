// @ts-check

import react from "@eslint-react/eslint-plugin";
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "node_modules",
      "dist",
      "eslint.config.js",
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
    files: ["src/**/*.{ts,tsx}"],
    ...react.configs["recommended-type-checked"],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
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
    files: ["*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
];
