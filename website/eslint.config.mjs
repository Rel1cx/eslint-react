import js from "@eslint/js";
import tseslint from "typescript-eslint";
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
