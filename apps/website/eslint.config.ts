import react from "@eslint-react/eslint-plugin";
import markdown from "@eslint/markdown";
import * as configs from "@local/configs/eslint";
// @ts-expect-error - no types for this package
import pluginNext from "@next/eslint-plugin-next";
import gitignore from "eslint-config-flat-gitignore";
import pluginMdx from "eslint-plugin-mdx";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

import TSCONFIG from "./tsconfig.json" with { type: "json" };

const GLOB_TS = ["**/*.ts", "**/*.tsx"];
const GLOB_JS = ["**/*.js", "**/*.jsx"];
const GLOB_MD = ["**/*.md"];
const GLOB_MDX = ["**/*.mdx"];
const GLOB_APP = ["app/**/*.{js,ts,jsx,tsx}"];
const GLOB_CONFIG = ["**/*.config.{js,mjs,ts,tsx}"];

export default tseslint.config(
  {
    extends: [
      markdown.configs.recommended,
    ],
    files: GLOB_MD,
    language: "markdown/gfm",
    rules: {
      "markdown/no-html": "error",
      "markdown/no-missing-label-refs": "off",
    },
  },
  {
    ...pluginMdx.flat,
    files: GLOB_MDX,
    processor: pluginMdx.createRemarkProcessor({
      lintCodeBlocks: false,
    }),
  },
  {
    extends: [
      configs.typescript,
    ],
    files: GLOB_TS,
    rules: {
      "no-restricted-syntax": "off",
    },
  },
  {
    extends: [
      tseslint.configs.recommendedTypeChecked,
      react.configs["recommended-type-checked"],
    ],
    files: TSCONFIG.include,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@next/next": pluginNext,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      ...pluginReactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "warn",
    },
  },
  {
    files: GLOB_APP,
    rules: {
      "@typescript-eslint/require-await": "off",
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: [...GLOB_JS, ...GLOB_CONFIG],
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
      "no-console": "off",
      "no-undef": "off",
    },
  },
  gitignore(),
);
