// @ts-check

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: [
      "node_modules",
      "dist",
    ],
  },
  // JavaScript rules
  js.configs.recommended,
  // TypeScript rules
  ...tseslint.configs.recommendedTypeChecked,
  // TypeScript languageOptions
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // TypeScript languageOptions for config files
  {
    files: ["*.config.{js,ts}", "*.d.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.node.json",
      },
    },
  },
  // React rules
  {
    files: ["src/**/*.{ts,tsx}"],
    ...react.configs["recommended-type-checked"],
  },
  // React Hooks rules
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
  // Disable type checking for JavaScript files
  {
    files: ["*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
];
