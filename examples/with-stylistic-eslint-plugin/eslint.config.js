import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import stylistic from "@stylistic/eslint-plugin";

export default [
  // TypeScript rules
  {
    files: ["**/*.ts"],
    ignores: ["**/*.d.ts"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": ts,
    },
    rules: {
      ...ts.configs["eslint-recommended"].rules,
      ...ts.configs["recommended"].rules,
    },
  },
  // Stylistic rules
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/jsx-indent": ["error", 2],
      // ... see https://eslint.style/packages/jsx#rules
    },
  },
  // React hooks rules
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  // React rules
  {
    files: ["src/**/*.{ts,tsx}"],
    ...react.configs.recommended,
  },
  // Configurations rules
  {
    files: ["*.config.{js,ts}"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.node.json",
      },
    },
  },
];
