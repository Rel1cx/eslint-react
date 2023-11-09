import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import stylistic from "@stylistic/eslint-plugin";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": ts,
      "react-hooks": reactHooks,
      "@stylistic": stylistic,
    },
    rules: {
      ...ts.configs["eslint-recommended"].rules,
      ...ts.configs["recommended"].rules,
      ...reactHooks.configs.recommended.rules,
      "@stylistic/jsx-indent": ["error", 2],
      // ... see https://eslint.style/packages/jsx#rules
    },
  },
  {
    files: ["*.config.ts"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.node.json",
      },
    },
  },
  react.configs.recommended,
];
