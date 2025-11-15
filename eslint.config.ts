import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import {
  GLOB_CONFIGS,
  GLOB_IGNORES,
  GLOB_SCRIPTS,
  GLOB_TESTS,
  GLOB_TS,
  disableProblematicEslintJsRules,
  disableTypeChecked,
  strictTypeChecked,
} from "@local/configs/eslint";
import { nullishComparison, templateExpression } from "@local/function-rules";
import { recommended as fastImportRecommended } from "eslint-plugin-fast-import";
import { functionRule } from "eslint-plugin-function-rule";
import pluginVitest from "eslint-plugin-vitest";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const dirname = fileURLToPath(new URL(".", import.meta.url));
const gitignore = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig(
  includeIgnoreFile(gitignore, "Imported .gitignore patterns") as never,
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
      tseslint.configs.strictTypeChecked,
      strictTypeChecked,
      // @ts-expect-error - types issue
      fastImportRecommended({ rootDir: dirname }),
    ],
    files: GLOB_TS,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: dirname,
      },
    },
    plugins: {
      "function-rule-1": functionRule(templateExpression()),
      "function-rule-2": functionRule(nullishComparison()),

      custom: functionRule((context) => ({
        CallExpression(node) {
          if (context.sourceCode.getText(node.callee) === "Date.now") {
            context.report({
              node,
              message: "Don't use 'Date.now()'.",
            });
          }
        },
      })),
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
      parserOptions: {
        projectService: true,
        tsconfigRootDir: dirname,
      },
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
