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

export default defineConfig(
  ...buildIgnoreConfig(path.join(import.meta.dirname, ".gitignore"), [
    ".*/**",
    "**/*.d.ts",
    "apps",
    "docs",
    "examples",
    "test",
    ...GLOB_TESTS,
  ]),
  {
    // Skip checks for rules ported directly from upstream
    ignores: [
      "plugins/eslint-plugin-react-x/src/rules/exhaustive-deps",
      "plugins/eslint-plugin-react-x/src/rules/rules-of-hooks",
    ],
  },
  // TypeScript Configuration (Main)
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
  // Scripts and Configs (Relaxed, No Type Checking)
  {
    extends: [
      disableTypeChecked,
    ],
    files: [
      ...GLOB_CONFIGS,
      ...GLOB_SCRIPTS,
    ],
    languageOptions: {
      parserOptions: {
        project: false,
        projectService: false,
      },
    },
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "no-console": "off",
      "perfectionist/sort-objects": "off",
    },
  },
  // Other Presets
  packageJson.configs["recommended-publishable"],
  disableProblematicEslintJsRules,
);
