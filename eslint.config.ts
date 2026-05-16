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
import packageJson from "eslint-plugin-package-json";
import { defineConfig } from "eslint/config";
import importIntegrityPlugin from "import-integrity-lint";
import path from "node:path";
import tseslint from "typescript-eslint";

const ignoreConfig = buildIgnoreConfig(path.join(import.meta.dirname, ".gitignore"), [
  ".*/**",
  "apps",
  "docs",
  "test",
  "examples",
  "**/*.d.ts",
  ...GLOB_TESTS,
]);

export default defineConfig(
  ...ignoreConfig,
  // Skip ESLint checks for rules ported directly from upstream
  {
    ignores: [
      "plugins/eslint-plugin-react-x/src/rules/exhaustive-deps",
      "plugins/eslint-plugin-react-x/src/rules/rules-of-hooks",
    ],
  },
  // Main TypeScript configuration with strict type checking
  {
    extends: [
      strictTypeChecked,
      // @ts-expect-error - TODO: remove when type issue is resolved
      importIntegrityPlugin.configs.recommended,
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
      "import-integrity/no-test-only-imports": "off",
      "import-integrity/no-unresolved-imports": "off",
      "import-integrity/no-unused-exports": "off",
    },
    settings: {
      "import-integrity": {
        packageRootDir: import.meta.dirname,
      },
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
      "perfectionist/sort-objects": "off",
    },
  },
  // package.json linting (recommended-publishable preset)
  packageJson.configs["recommended-publishable"],
  // Disable ESLint core rules that conflict with TypeScript
  disableProblematicEslintJsRules,
);
