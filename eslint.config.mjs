// @ts-check

import url from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import eslintCommentsPlugin from "eslint-plugin-eslint-comments";
import eslintPluginPlugin from "eslint-plugin-eslint-plugin";
import gitignore from "eslint-config-flat-gitignore";
import jsdocPlugin from "eslint-plugin-jsdoc";
import perfectionist from "eslint-plugin-perfectionist";
import perfectionistNatural from "eslint-plugin-perfectionist/configs/recommended-natural";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";
import vitest from "eslint-plugin-vitest";

const dirname = url.fileURLToPath(new URL(".", import.meta.url));
// const compat = new FlatCompat({ baseDirectory: dirname });

export default tseslint.config(
  // register all of the plugins up-front
  {
    // note - intentionally uses computed syntax to make it easy to sort the keys
    plugins: {
      ["@typescript-eslint"]: tseslint.plugin,
      ["eslint-plugin"]: eslintPluginPlugin,
      ["eslint-comments"]: eslintCommentsPlugin,
      ["jsdoc"]: jsdocPlugin,
      ["simple-import-sort"]: simpleImportSortPlugin,
      ["perfectionist"]: perfectionist,
    },
  },
  // extends ...
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  // @ts-ignore
  perfectionistNatural,
  jsdocPlugin.configs["flat/recommended-typescript-error"],
  // base config
  {
    languageOptions: {
      parserOptions: {
        allowAutomaticSingleRunInference: true,
        project: [
          "tsconfig.json",
          "packages/*/tsconfig.json",
          "packages/*/*/tsconfig.json",
        ],
        tsconfigRootDir: dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    rules: {
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": true,
          "ts-nocheck": true,
          "ts-check": false,
          minimumDescriptionLength: 5,
        },
      ],
      "@typescript-eslint/consistent-type-imports": ["error", {
        prefer: "type-imports",
        disallowTypeAnnotations: true,
      }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          caughtErrors: "all",
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/prefer-nullish-coalescing": [
        "error",
        {
          ignoreConditionalTests: true,
          ignorePrimitives: true,
        },
      ],
      "array-callback-return": "off",
      "eslint-plugin/require-meta-docs-url": "off",
      "logical-assignment-operators": "error",
      "max-depth": ["warn", 3],
      "no-console": "error",
      "no-else-return": "error",
      "no-fallthrough": ["error", { commentPattern: ".*intentional fallthrough.*" }],
      "no-mixed-operators": "error",
      "no-process-exit": "error",
      "no-undef": "off",
      "one-var": ["error", "never"],
      "prefer-object-has-own": "error",
      curly: "off",
      eqeqeq: ["error", "always"],
      "no-restricted-syntax": [
        "error",
        {
          message: "no let",
          selector: "VariableDeclaration[kind=let]",
        },
        {
          message: "no else",
          selector: "IfStatement[alternate]",
        },
        {
          message: "no optional",
          selector: "TSPropertySignature[optional=true]",
        },
        {
          message: "potential circular dependency",
          selector: 'ImportDeclaration[source.value="."]',
        },
      ],
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "perfectionist/sort-exports": "off",
      "perfectionist/sort-imports": "off",
      "perfectionist/sort-named-exports": "off",
      "perfectionist/sort-named-imports": "off",
      "perfectionist/sort-object-types": "off",
      "perfectionist/sort-objects": [
        "warn",
        {
          order: "asc",
          type: "natural",
          "partition-by-comment": "Part:**",
          groups: ["id", "type", "meta", "unknown"],
          "custom-groups": {
            id: ["_", "id", "key"],
            type: ["type", "kind"],
            meta: [
              "name",
              "meta",
              "title",
              "description",
            ],
          },
        },
      ],
      "perfectionist/sort-union-types": [
        "warn",
        {
          order: "asc",
          type: "natural",
        },
      ],
      "eslint-comments/disable-enable-pair": ["error", { allowWholeFile: true }],
      "eslint-comments/no-aggregating-enable": "error",
      "eslint-comments/no-duplicate-disable": "error",
      "eslint-comments/no-unlimited-disable": "error",
      "eslint-comments/no-unused-disable": "error",
      "eslint-comments/no-unused-enable": "error",
      "eslint-comments/no-use": [
        "error",
        {
          allow: [
            "eslint-disable",
            "eslint-disable-line",
            "eslint-disable-next-line",
            "eslint-enable",
            "global",
          ],
        },
      ],
      "jsdoc/check-tag-names": "off",
      "jsdoc/check-param-names": "off",
      "jsdoc/require-jsdoc": "off",
      "jsdoc/require-param": "off",
      "jsdoc/require-param-description": "off",
      "jsdoc/require-returns": "off",
      "jsdoc/require-yields": "off",
      "jsdoc/tag-lines": "off",
      "jsdoc/informative-docs": "warn",
    },
  },
  {
    files: ["**/*.js"],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      // turn off rules that don't apply to JS code
    },
  },
  {
    files: [
      "**/*.spec.{ts,tsx,cts,mts}",
      "**/*.test.{ts,tsx,cts,mts}",
      "**/spec.{ts,tsx,cts,mts}",
      "**/test.{ts,tsx,cts,mts}",
    ],
    plugins: {
      vitest,
    },
    rules: {
      // @ts-ignore
      ...vitest.configs.recommended.rules,
      "@typescript-eslint/no-empty-function": ["error", { allow: ["arrowFunctions"] }],
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
  gitignore(),
  {
    ignores: [
      "docs",
      "examples",
      "website",
      "eslint.config.mjs",
    ],
  },
);
