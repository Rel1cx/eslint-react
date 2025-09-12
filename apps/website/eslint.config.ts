import react from "@eslint-react/eslint-plugin";
import markdown from "@eslint/markdown";
import { disableTypeChecked, strictTypeChecked } from "@local/configs/eslint";
import gitignore from "eslint-config-flat-gitignore";
import { recommended as fastImportRecommended } from "eslint-plugin-fast-import";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import { globalIgnores } from "eslint/config";
import { defineConfig } from "eslint/config";
import url from "node:url";
import tseslint from "typescript-eslint";

import TSCONFIG from "./tsconfig.json" with { type: "json" };

const GLOB_TS = ["**/*.ts", "**/*.tsx"];
const GLOB_JS = ["**/*.js", "**/*.jsx"];
const GLOB_MD = ["**/*.md"];
const GLOB_MDX = ["**/*.mdx"];
const GLOB_APP = ["app/**/*.{js,ts,jsx,tsx}"];
const GLOB_COMPONENT = ["components/**/*.{js,ts,jsx,tsx}"];
const GLOB_CONFIG = ["**/*.config.{js,mjs,ts,tsx}"];
const GLOB_IGNORES = [
  "test",
  "**/*.d.ts",
  "eslint.config.ts",
];

const dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default defineConfig([
  gitignore(),
  globalIgnores(GLOB_IGNORES),
  {
    extends: [
      markdown.configs.recommended,
    ],
    files: [...GLOB_MD, ...GLOB_MDX],
    language: "markdown/gfm",
    rules: {
      "markdown/no-html": "warn",
      "markdown/no-missing-label-refs": "off",
    },
  },
  {
    files: GLOB_MDX,
    rules: {
      "markdown/no-html": "off",
    },
  },
  {
    extends: [
      strictTypeChecked, // @ts-expect-error - types issue
      fastImportRecommended({ rootDir: dirname }),
    ],
    files: GLOB_TS,
    rules: {
      "no-restricted-syntax": "off",
      "fast-import/no-unused-exports": "off",
      "fast-import/no-unresolved-imports": "off",
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
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "@eslint-react/naming-convention/filename": ["error", { rule: "kebab-case" }],
      "@eslint-react/no-unused-props": "warn",
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
    files: GLOB_COMPONENT,
    rules: {
      "@eslint-react/naming-convention/filename": ["error", { rule: "PascalCase" }],
    },
  },
  {
    extends: [
      disableTypeChecked,
      react.configs["disable-type-checked"],
    ],
    files: [...GLOB_JS, ...GLOB_CONFIG],
    rules: {
      "no-console": "off",
      "no-undef": "off",
    },
  },
]);
