import react from "@eslint-react/eslint-plugin";
import { includeIgnoreFile } from "@eslint/compat";
import { disableTypeChecked, strictTypeChecked } from "@local/configs/eslint";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import importIntegrityPlugin from "import-integrity-lint";
import path from "node:path";
import tseslint from "typescript-eslint";

import TSCONFIG from "./tsconfig.json" with { type: "json" };

const GLOB_APP = ["app/**/*.{js,ts,jsx,tsx}"];
const GLOB_CONFIG = ["**/*.config.{js,mjs,ts,tsx}"];
const GLOB_IGNORES = [
  "**/*.d.ts",
  "eslint.config.ts",
  "testing",
];
const GLOB_JS = ["**/*.js", "**/*.jsx"];
const GLOB_TS = ["**/*.ts", "**/*.tsx"];

export default defineConfig(
  // Ignore patterns from .gitignore and additional exclusions
  includeIgnoreFile(path.join(import.meta.dirname, ".gitignore")),
  globalIgnores(GLOB_IGNORES),
  // Base TypeScript config with strict type checking
  {
    files: GLOB_TS,
    extends: [
      strictTypeChecked,
      // @ts-expect-error - wait for import-integrity-lint to update
      importIntegrityPlugin.configs.recommended,
    ],
    settings: {
      "import-integrity": {
        packageRootDir: import.meta.dirname,
      },
    },
    rules: {
      "import-integrity/no-unresolved-imports": "off",
      "import-integrity/no-unused-exports": "off",
      "import-integrity/prefer-alias-imports": "off",
      "no-restricted-syntax": "off",
    },
  },
  // React type-checked configuration
  {
    files: TSCONFIG.include,
    extends: [
      tseslint.configs.base,
      react.configs["recommended-type-checked"],
      pluginReactHooks.configs.flat["recommended-latest"] ?? [],
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      "@eslint-react/no-unused-props": "warn",
      "react-refresh/only-export-components": "warn",
    },
  },
  // App directory overrides
  {
    files: GLOB_APP,
    rules: {
      "@typescript-eslint/require-await": "off",
      "react-refresh/only-export-components": "off",
    },
  },
  // JavaScript and config files (no type checking)
  {
    files: [...GLOB_JS, ...GLOB_CONFIG],
    extends: [
      disableTypeChecked,
      react.configs["disable-type-checked"],
    ],
    rules: {
      "no-console": "off",
      "no-undef": "off",
    },
  },
);
