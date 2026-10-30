import {
  GLOB_CONFIGS,
  GLOB_PUBLISHABLE,
  GLOB_SCRIPTS,
  GLOB_TESTS,
  GLOB_TS,
  buildIgnoreConfig,
  disableProblematicEslintJsRules,
  disableTypeChecked,
  strictTypeChecked,
} from "@local/configs/eslint";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import packageJson from "eslint-plugin-package-json";
import { defineConfig, globalIgnores } from "eslint/config";
import importIntegrityPlugin from "import-integrity-lint";
import path from "node:path";
import tseslint from "typescript-eslint";

export default defineConfig(
  ...buildIgnoreConfig(path.join(import.meta.dirname, ".gitignore"), [
    "**/*.d.ts",
    "apps",
    "docs",
    "examples",
    "testing",
    ...GLOB_TESTS,
  ]),
  {
    ignores: [
      "plugins/eslint-plugin-react-x/src/rules/exhaustive-deps",
      "plugins/eslint-plugin-react-x/src/rules/rules-of-hooks",
      "plugins/eslint-plugin/src/rules/exhaustive-deps/exhaustive-deps.ts",
    ],
  },
  {
    files: GLOB_TS,
    extends: [
      strictTypeChecked,
      // @ts-expect-error - import-integrity plugin has incompatible type definitions
      importIntegrityPlugin.configs.recommended,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      "import-integrity": {
        packageRootDir: import.meta.dirname,
      },
    },
    rules: {
      "import-integrity/no-test-only-imports": "off",
      "import-integrity/no-unresolved-imports": "off",
      "import-integrity/no-unused-exports": "off",
    },
  },
  {
    files: GLOB_PUBLISHABLE,
    rules: {
      "@typescript-eslint/no-restricted-imports": ["error", {
        patterns: [
          {
            allowTypeImports: true,
            message: "Runtime code must not load ESLint. Use the helpers from `@eslint-react/eslint` instead.",
            regex: "^eslint(/.*)?$",
          },
          {
            allowTypeImports: true,
            message: "Use `@typescript-eslint/utils/ast-utils` or `@typescript-eslint/utils/eslint-utils` instead.",
            regex: "^@typescript-eslint/utils(/(?!(?:ast|eslint)-utils$).*)?$",
          },
          {
            allowTypeImports: true,
            message: "Use `getConstrainedTypeAtLocation` from `@eslint-react/eslint` instead.",
            regex: "^@typescript-eslint/type-utils(/.*)?$",
          },
        ],
      }],
    },
  },
  {
    files: ["plugins/*/src/rules/**/*.ts"],
    extends: [
      eslintPlugin.configs.recommended,
    ],
    rules: {
      "perfectionist/sort-objects": "off",
    },
  },
  {
    files: [
      ...GLOB_CONFIGS,
      ...GLOB_SCRIPTS,
    ],
    extends: [
      disableTypeChecked,
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
  packageJson.configs["recommended-publishable"],
  disableProblematicEslintJsRules,
  globalIgnores(["!*.cjs"]),
);
