// @ts-check

import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import eslintReact from "@eslint-react/eslint-plugin";
import gitignore from "eslint-config-flat-gitignore";

export default tseslint.config(
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // React hooks rules
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  // ESLint React rules
  {
    files: ["src/**/*.{ts,tsx}"],
    ...eslintReact.configs.recommended,
  },
  // Configurations rules
  {
    files: ["*.config.{js,ts}", "*.d.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.node.json",
      },
    },
  },
  {
    files: ["*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
  // Ignore files
  gitignore(),
);
