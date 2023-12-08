/* eslint-disable sonarjs/no-duplicate-string */
// @ts-check
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  env: {
    node: true,
    browser: false,
    es2024: true,
  },
  ignorePatterns: [
    "**/dist",
    "**/test/fixtures",
    "docs",
    "examples",
    "website",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        project: [
          "./tsconfig.json",
          "./packages/*/tsconfig.json",
        ],
        sourceType: "module",
        tsconfigRootDir: __dirname,
      },
      extends: [
        "with-tsconfig",
        "plugin:perfectionist/recommended-natural",
        "plugin:functional/recommended",
        "plugin:functional-core/recommended",
        "plugin:filenames-simple/recommended",
        "plugin:jsdoc/recommended-typescript",
        "plugin:eslint-plugin/all",
      ],
      plugins: ["functional", "functional-core", "total-functions", "filenames-simple"],
      rules: {
        quotes: ["error", "double", { avoidEscape: true }],
        "no-undef": "off",
        "no-console": ["warn", { allow: ["warn", "error"] }],
        "max-len": "off",
        "max-depth": ["warn", 3],
        "newline-before-return": "warn",
        "prefer-object-has-own": "error",
        "array-callback-return": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            argsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
            varsIgnorePattern: "(^_)|(^ESLintUtils$)",
          },
        ],
        "@typescript-eslint/prefer-readonly": "warn",
        "@typescript-eslint/prefer-nullish-coalescing": "warn",
        "@typescript-eslint/strict-boolean-expressions": "error",
        "@susisu/safe-typescript/no-unsafe-object-property-check": "off",
        "import-access/jsdoc": ["error"],
        "jsdoc/require-jsdoc": "off",
        "jsdoc/require-param-description": "off",
        "jsdoc/require-returns": "off",
        "filenames-simple/named-export": "off",
        "functional/no-mixed-types": "off",
        "functional/no-return-void": "off",
        "functional/functional-parameters": "off",
        "functional/prefer-immutable-types": "off",
        "functional-core/purity": ["error", { allowThrow: false }],
        "total-functions/no-enums": "error",
        "total-functions/require-strict-mode": "error",
        "total-functions/no-partial-division": "warn",
        "total-functions/no-partial-array-reduce": "warn",
        "total-functions/no-partial-url-constructor": "warn",
        "eslint-plugin/require-meta-docs-url": "off",
        "perfectionist/sort-exports": "off",
        "perfectionist/sort-imports": "off",
        "perfectionist/sort-named-imports": "off",
        "perfectionist/sort-object-types": "off",
        "perfectionist/sort-objects": [
          "warn",
          {
            type: "natural",
            "always-on-top": [
              "_",
              "id",
              "key",
              "type",
              "kind",
              "name",
              "meta",
              "docs",
              "fixable",
              "schema",
              "message",
              "title",
              "description",
              "defaultOptions",
            ],
            order: "asc",
          },
        ],
        "perfectionist/sort-union-types": [
          "warn",
          {
            type: "natural",
            order: "asc",
          },
        ],
        "regexp/no-unused-capturing-group": "off",
        "regexp/prefer-named-capture-group": "off",
        "simple-import-sort/exports": "warn",
        "simple-import-sort/imports": "warn",
        "unicorn/template-indent": ["warn", { indent: 2 }],
        "no-restricted-syntax": [
          "error",
          {
            selector: "VariableDeclaration[kind=let]",
            message: "no let",
          },
          {
            selector: "IfStatement[alternate]",
            message: "no else",
          },
          {
            selector: "TSPropertySignature[optional=true]",
            message: "no optional",
          },
        ],
      },
      settings: {
        "functional-core": {
          purePaths: [
            "./packages/tools",
            "./packages/types",
            "./packages/shared",
          ],
        },
      },
    },
    {
      files: [
        "./packages/tools/src/**/*.ts",
        "./packages/types/src/**/*.ts",
        "./packages/shared/src/**/*.ts",
      ],
      extends: [
        "plugin:functional/strict",
      ],
      rules: {
        "functional/no-mixed-types": "off",
        "functional/no-return-void": "off",
        "functional/no-conditional-statements": "off",
        "functional/functional-parameters": "off",
      },
    },
    {
      files: [
        "./packages/ast/**/*",
        "./packages/jsx/**/*",
        "./packages/core/**/*",
      ],
      extends: [
        "plugin:functional/strict",
      ],
      rules: {
        "functional/no-return-void": "off",
        "functional/no-expression-statements": "off",
        "functional/no-conditional-statements": "off",
        "functional/immutable-data": "off",
        "functional/prefer-immutable-types": "off",
        "functional/functional-parameters": "off",
      },
    },
    {
      files: ["./packages/eslint-*/src/rules/**/*"],
      extends: [
        "plugin:functional/off",
      ],
      rules: {
        "perfectionist/sort-objects": "off",
      },
    },
    {
      files: ["./scripts/**/*.ts"],
      globals: {
        Bun: "readonly",
      },
      extends: [
        "plugin:functional/off",
      ],
      rules: {
        "no-await-in-loop": "off",
      },
    },
    {
      files: ["./test/**/*"],
      extends: [
        "plugin:functional/off",
      ],
    },
    {
      extends: ["plugin:vitest/recommended", "plugin:functional/off"],
      files: "*.spec.ts",
      plugins: ["vitest"],
      rules: {
        "perfectionist/sort-objects": "off",
        "sonarjs/no-duplicate-string": "off",
        "vitest/consistent-test-filename": "off",
        "vitest/require-hook": "off",
      },
    },
    {
      files: ["./packages/*/*.config.ts"],
      rules: {
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "functional-core/purity": "off",
      },
    },
    {
      files: ["./.eslintrc.cjs"],
      rules: {
        "jsdoc/check-tag-names": "off",
        "perfectionist/sort-objects": "off",
        "functional/immutable-data": "off",
        "functional/no-expression-statements": "off",
        "filenames-simple/naming-convention": "off",
      },
    },
    {
      files: ["*.d.ts"],
      rules: {
        "@typescript-eslint/consistent-type-definitions": "off",
        "filenames-simple/naming-convention": "off",
      },
    },
  ],
});
