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
  // Global ignores: .gitignore + shared defaults + project-specific exclusions
  ...buildIgnoreConfig(path.join(import.meta.dirname, ".gitignore"), [
    "**/*.d.ts",
    ...GLOB_TESTS,
    "apps",
    "docs",
    "examples",
    "testing",
  ]),
  // Skip checks for rules ported directly from upstream
  {
    ignores: [
      "plugins/eslint-plugin-react-x/src/rules/exhaustive-deps",
      "plugins/eslint-plugin-react-x/src/rules/rules-of-hooks",
      "plugins/eslint-plugin-react-x/src/rules/unstable-exhaustive-deps/unstable-exhaustive-deps.ts",
    ],
  },
  // TypeScript configuration (type-aware)
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
  // Publishable packages: restrict runtime imports of ESLint internals
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
  // ESLint rule authoring
  {
    files: ["plugins/*/src/rules/**/*.ts"],
    extends: [
      eslintPlugin.configs.recommended,
    ],
    rules: {
      "perfectionist/sort-objects": "off",
    },
  },
  // Scripts and configs (relaxed, no type checking)
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
  // package.json
  packageJson.configs["recommended-publishable"],
  // Disable ESLint core rules replaced by TypeScript counterparts
  disableProblematicEslintJsRules,
  // Un-ignore root-level CJS config files so they can be linted
  globalIgnores(["!*.cjs"]),
);
