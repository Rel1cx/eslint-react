import eslintJs from "@eslint/js";
import gitignore from "eslint-config-flat-gitignore";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactX from "eslint-plugin-react-x";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

import TSCONFIG from "./tsconfig.json" with { type: "json" };

const GLOB_TS = ["**/*.ts", "**/*.tsx"];
const GLOB_JS = ["**/*.js", "**/*.jsx"];
const GLOB_CONFIG = ["**/*.config.{js,mjs,ts,tsx}"];

export default defineConfig([
  gitignore(),
  {
    files: GLOB_TS,
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
    ],
  },
  {
    files: TSCONFIG.include,
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
    files: TSCONFIG.include,
    extends: [
      eslintPluginReactX.configs["recommended-type-checked"],
    ],
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },
  {
    files: [...GLOB_JS, ...GLOB_CONFIG],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      "no-undef": "off",
      "no-console": "off",
    },
  },
]);
