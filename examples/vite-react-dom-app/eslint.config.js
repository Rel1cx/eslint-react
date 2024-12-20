import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

const GLOB_JS = ["*.{js,jsx,cjs,mjs}", "**/*.{js,jsx,cjs,mjs}"];
const GLOB_TS = ["*.{ts,tsx,cts,mts}", "**/*.{ts,tsx,cts,mts}"];
const GLOB_SRC = [...GLOB_JS, ...GLOB_TS].map((pattern) => `src/${pattern}`);
const GLOB_CONFIG = ["*.config.{ts,tsx,cts,mts}", "**/*.config.{ts,tsx,cts,mts}"];

export default tseslint.config(
  {
    ignores: [
      "node_modules",
      "dist",
      "eslint.config.js",
      "eslint.config.d.ts",
    ],
  },
  js.configs.recommended,
  {
    files: GLOB_TS,
    extends: [
      tseslint.configs.recommended,
    ],
  },
  {
    files: GLOB_SRC,
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
    files: GLOB_SRC,
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    files: GLOB_SRC,
    ...react.configs["recommended-type-checked"],
  },
  {
    files: GLOB_SRC,
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": "warn",
    },
  },
  {
    files: [...GLOB_JS, ...GLOB_CONFIG],
    extends: [
      tseslint.configs.disableTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.node.json",
        projectService: false,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
