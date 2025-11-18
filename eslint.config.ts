import { fileURLToPath } from "node:url";

import {
  GLOB_CONFIGS,
  GLOB_SCRIPTS,
  GLOB_TESTS,
  GLOB_TS,
  buildIgnoreConfig,
  buildParserOptions,
  disableProblematicEslintJsRules,
  disableTypeChecked,
  strictTypeChecked,
} from "@local/configs/eslint";
import { nullishComparison, templateExpression } from "@local/function-rules";
import { recommended as fastImportRecommended } from "eslint-plugin-fast-import";
import { functionRule } from "eslint-plugin-function-rule";
import pluginVitest from "eslint-plugin-vitest";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

const ignoreConfig = buildIgnoreConfig(
  fileURLToPath(new URL(".gitignore", import.meta.url)),
  "apps",
  "docs",
  "test",
  "examples",
  "**/*.d.ts",
);

const parserOptions = buildParserOptions(fileURLToPath(new URL(".", import.meta.url)));

export default defineConfig(
  ...ignoreConfig,
  {
    extends: [
      tseslint.configs.strictTypeChecked,
      strictTypeChecked,
      // @ts-expect-error - types issue
      fastImportRecommended({ rootDir: parserOptions.tsconfigRootDir }),
    ],
    files: GLOB_TS,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions,
    },
    plugins: {
      "function-rule-1": functionRule(templateExpression()),
      "function-rule-2": functionRule(nullishComparison()),
    },
    rules: {
      "fast-import/no-unused-exports": "off",
      "function-rule-1/function-rule": "warn",
      "function-rule-2/function-rule": "error",
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
      parserOptions,
    },
    plugins: {
      vitest: pluginVitest,
    },
    rules: {
      "@typescript-eslint/no-empty-function": ["error", { allow: ["arrowFunctions"] }],
      "function-rule-1/function-rule": "off",
      "function-rule-2/function-rule": "off",
    },
  },
  disableProblematicEslintJsRules,
);
