import eslintJs from "@eslint/js";
import eslintPluginReactX from "eslint-plugin-react-x";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import gitignore from "eslint-config-flat-gitignore";

import TSCONFIG from "./tsconfig.json" with { type: "json" };

const GLOB_TS = ["**/*.ts", "**/*.tsx"];
const GLOB_JS = ["**/*.js", "**/*.jsx"];
const GLOB_CONFIG = ["**/*.config.{js,mjs,ts,tsx}"];

export default tseslint.config(
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
      "react-x/no-unnecessary-use-effect": "warn",
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
);
