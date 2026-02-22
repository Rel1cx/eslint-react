import {
  GLOB_CONFIGS,
  GLOB_SCRIPTS,
  GLOB_TS,
  buildIgnoreConfig,
  disableProblematicEslintJsRules,
  disableTypeChecked,
  strictTypeChecked,
} from "@local/configs/eslint";
import { recommended as fastImportRecommended } from "eslint-plugin-fast-import";
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
  // Skip ESLint checks for rules ported directly from upstream
  {
    ignores: [
      "packages/plugins/eslint-plugin-react-x/src/rules/exhaustive-deps",
      "packages/plugins/eslint-plugin-react-x/src/rules/rules-of-hooks",
    ],
  },
  // Main TypeScript configuration with strict type checking
  {
    extends: [
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
    rules: {
      "fast-import/consistent-file-extensions": ["error", { mode: "never" }],
      "fast-import/no-unused-exports": "off",
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
  // Disable ESLint core rules that conflict with TypeScript
  disableProblematicEslintJsRules,
);
