// @ts-check

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";

export default [
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
    ...react.configs.recommended,
  },
  // React Hooks rules
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  // Disable type checking for JavaScript files
  {
    files: ["*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
];
