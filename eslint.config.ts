import {
  GLOB_CONFIGS,
  GLOB_SCRIPTS,
  GLOB_TESTS,
  GLOB_TS,
  buildIgnoreConfig,
  disableProblematicEslintJsRules,
  disableTypeChecked,
  strictTypeChecked,
} from "@local/configs/eslint";
import { nullishComparison, templateExpression } from "@local/function-rules";
import { recommended as fastImportRecommended } from "eslint-plugin-fast-import";
import { functionRule } from "eslint-plugin-function-rule";
import { defineConfig } from "eslint/config";
import path from "node:path";
import tseslint from "typescript-eslint";

// Build ignore patterns from . gitignore + additional exclusions
const ignoreConfig = buildIgnoreConfig(path.join(import.meta.dirname, ".gitignore"), [
  "apps",
  "docs",
  "test",
  "examples",
  "**/*.d.ts",
]);

export default defineConfig(
  ...ignoreConfig,
  // Main TypeScript configuration with strict type checking
  {
    extends: [
      tseslint.configs.strictTypeChecked,
      strictTypeChecked,
      // @ts-expect-error - types issue
      fastImportRecommended({ rootDir: import.meta.dirname }),
    ],
    files: GLOB_TS,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    // Custom function-based lint rules
    plugins: {
      "function-rule-1": functionRule(templateExpression()),
      "function-rule-2": functionRule(nullishComparison()),
    },
    rules: {
      "fast-import/consistent-file-extensions": ["error", { mode: "never" }],
      "fast-import/no-unused-exports": "off",
      "function-rule-1/function-rule": "warn",
      "function-rule-2/function-rule": "error",
    },
  },
  // Relaxed config for scripts and config files (no type checking)
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
  // Test files:  allow empty arrow functions, disable custom rules
  {
    files: GLOB_TESTS,
    rules: {
      "@typescript-eslint/no-empty-function": ["error", { allow: ["arrowFunctions"] }],
      "function-rule-1/function-rule": "off",
      "function-rule-2/function-rule": "off",
    },
  },
  // Disable ESLint core rules that conflict with TypeScript
  disableProblematicEslintJsRules,
);
