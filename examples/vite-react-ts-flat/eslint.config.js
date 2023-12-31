import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import eslintReact from "@eslint-react/eslint-plugin";

export default [
  // TypeScript rules
  {
    files: ["*.ts", "*.tsx"],
    ignores: ["**/*.d.ts"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
      },
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
  // ESLint React rules
  {
    files: ["src/**/*.{ts,tsx}"],
    ...eslintReact.configs.recommended,
  },
  // Configurations rules
  {
    files: ["*.config.{js,ts}"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
      parserOptions: {
        // This is important if you want to lint your config files under project root as well
        project: "./tsconfig.node.json",
      },
    },
  },
];
