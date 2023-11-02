import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import stylisticJsx from "@stylistic/eslint-plugin-jsx";

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
      "@stylistic/jsx": stylisticJsx,
    },
    rules: {
      ...ts.configs["eslint-recommended"].rules,
      ...ts.configs["recommended"].rules,
      ...reactHooks.configs.recommended.rules,
      "@stylistic/jsx/jsx-indent-props": ["error", 2],
      "@stylistic/jsx/jsx-max-props-per-line": ["error", { maximum: 1, when: "multiline" }],
      // ... see https://eslint.style/packages/jsx#rules
    },
  },
  react.configs.recommended,
];
