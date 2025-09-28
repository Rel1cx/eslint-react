import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import markdown from "@eslint/markdown";
import {
  GLOB_CONFIGS,
  GLOB_IGNORES,
  GLOB_MD,
  GLOB_SCRIPTS,
  GLOB_TESTS,
  GLOB_TS,
  disableTypeChecked,
  strictTypeChecked,
} from "@local/configs/eslint";
import pluginLocal from "@local/eslint-plugin-local";
import { recommended as fastImportRecommended } from "eslint-plugin-fast-import";
import pluginVitest from "eslint-plugin-vitest";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const dirname = fileURLToPath(new URL(".", import.meta.url));
const gitignore = fileURLToPath(new URL(".gitignore", import.meta.url));

const packagesTsConfigs = [
  "packages/*/tsconfig.json",
  "packages/*/*/tsconfig.json",
];

export default defineConfig([
  includeIgnoreFile(gitignore, "Imported .gitignore patterns"),
  globalIgnores([
    ...GLOB_IGNORES,
    "apps",
    "docs",
    "test",
    "examples",
    "**/*.d.ts",
  ]),
  {
    extends: [
      markdown.configs.recommended,
    ],
    files: GLOB_MD,
    ignores: [
      "**/README.md",
      "packages/**/docs/**/*.md",
    ],
    language: "markdown/gfm",
    rules: {
      "markdown/no-html": "off",
      "markdown/no-missing-label-refs": "off",
      "markdown/no-multiple-h1": "off",
    },
  },
  {
    extends: [
      tseslint.configs.strictTypeChecked,
      strictTypeChecked,
      // @ts-expect-error - types issue
      fastImportRecommended({ rootDir: dirname }),
    ],
    files: GLOB_TS,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: packagesTsConfigs,
        projectService: true,
        tsconfigRootDir: dirname,
      },
    },
    plugins: {
      local: pluginLocal,
    },
    rules: {
      // Part: local rules
      "local/avoid-multiline-template-expression": "warn",
      "local/no-shadow-underscore": "error",
      "local/prefer-eqeq-nullish-comparison": "warn",

      "fast-import/no-unused-exports": "off",
    },
  },
  {
    extends: [
      disableTypeChecked,
    ],
    files: [...GLOB_SCRIPTS, ...GLOB_CONFIGS],
    languageOptions: {
      parserOptions: {
        project: false,
        projectService: false,
      },
    },
    rules: {
      "no-console": "off",
    },
  },
  {
    extends: [
      pluginVitest.configs.recommended,
    ],
    files: GLOB_TESTS,
    languageOptions: {
      globals: {
        ...pluginVitest.environments.env.globals,
      },
      parserOptions: {
        project: "tsconfig.json",
        projectService: true,
        tsconfigRootDir: dirname,
      },
    },
    plugins: {
      vitest: pluginVitest,
    },
    rules: {
      "@typescript-eslint/no-empty-function": ["error", { allow: ["arrowFunctions"] }],
      "local/avoid-multiline-template-expression": "off",
    },
  },
]);
