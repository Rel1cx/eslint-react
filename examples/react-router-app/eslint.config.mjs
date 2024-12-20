import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import gitignore from "eslint-config-flat-gitignore";

const GLOB_TS = ["**/*.{ts,tsx}"];
const GLOB_JS = ["**/*.{js,cjs,mjs}"];
const GLOB_CONFIG = ["**/*.config.{js,mjs,cjs,ts,tsx}"];

export default tseslint.config(
  js.configs.recommended,
  {
    files: GLOB_TS,
    extends: [
      tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: GLOB_TS,
    ...react.configs.recommended,
  },
  {
    files: GLOB_TS,
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    files: [...GLOB_JS, ...GLOB_CONFIG],
    extends: [
      tseslint.configs.disableTypeChecked,
    ],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  gitignore(),
);
