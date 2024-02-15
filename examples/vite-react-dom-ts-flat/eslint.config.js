// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import eslintReact from "@eslint-react/eslint-plugin";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
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
        // This is important if you want to lint your config files under project root as well
        project: "./tsconfig.node.json",
      },
    },
  },
  {
    files: ["*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
);
