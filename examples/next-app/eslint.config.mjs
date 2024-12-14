import js from "@eslint/js";
import tseslint from "typescript-eslint";
import next from "@next/eslint-plugin-next";
import react from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import gitignore from "eslint-config-flat-gitignore";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "no-undef": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    ...react.configs.recommended,
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@next/next": next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
    },
  },
  {
    files: ["app/**/*.{js,ts,jsx,tsx}"],
    rules: {
      "@typescript-eslint/require-await": "off",
    },
  },
  {
    files: ["*.js", "*.cjs"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ["*.js", "*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  gitignore(),
  {
    ignores: ["*.config.mjs"],
  },
);
