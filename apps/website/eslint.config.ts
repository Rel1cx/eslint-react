import react from "@eslint-react/eslint-plugin";
import { includeIgnoreFile } from "@eslint/compat";
import { disableTypeChecked, strictTypeChecked } from "@local/configs/eslint";
import { recommended as fastImportRecommended } from "eslint-plugin-fast-import";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import { globalIgnores } from "eslint/config";
import { defineConfig } from "eslint/config";
import path from "node:path";
import tseslint from "typescript-eslint";

import TSCONFIG from "./tsconfig.json" with { type: "json" };

const GLOB_TS = ["**/*.ts", "**/*.tsx"];
const GLOB_JS = ["**/*.js", "**/*.jsx"];
const GLOB_APP = ["app/**/*.{js,ts,jsx,tsx}"];
const GLOB_COMPONENT = ["components/**/*.{js,ts,jsx,tsx}"];
const GLOB_CONFIG = ["**/*.config.{js,mjs,ts,tsx}"];
const GLOB_IGNORES = [
  "test",
  "**/*.d.ts",
  "eslint.config.ts",
];

export default defineConfig(
  // Ignore patterns from .gitignore and additional exclusions
  includeIgnoreFile(path.join(import.meta.dirname, ".gitignore")),
  globalIgnores(GLOB_IGNORES),
  // Base TypeScript config with strict type checking
  {
    extends: [
      strictTypeChecked,
      // @ts-expect-error - types issue
      fastImportRecommended({ rootDir: import.meta.dirname }),
    ],
    files: GLOB_TS,
    rules: {
      "no-restricted-syntax": "off",
      "fast-import/no-unused-exports": "off",
      "fast-import/no-unresolved-imports": "off",
      "fast-import/consistent-file-extensions": "off",
    },
  },
  {
    extends: [
      tseslint.configs.recommendedTypeChecked,
      react.configs["recommended-type-checked"],
      pluginReactHooks.configs.flat["recommended-latest"] ?? [],
    ],
    files: TSCONFIG.include,
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
      "@eslint-react/naming-convention/filename": ["error", { rule: "kebab-case" }],
      "@eslint-react/no-unused-props": "warn",
      "react-refresh/only-export-components": "warn",
    },
  },
  {
    files: GLOB_APP,
    rules: {
      "@typescript-eslint/require-await": "off",
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: GLOB_COMPONENT,
    rules: {
      "@eslint-react/naming-convention/filename": ["error", { rule: "PascalCase" }],
    },
  },
  {
    extends: [
      disableTypeChecked,
      react.configs["disable-type-checked"],
    ],
    files: [...GLOB_JS, ...GLOB_CONFIG],
    rules: {
      "no-console": "off",
      "no-undef": "off",
    },
  },
);
