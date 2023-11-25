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
  plugins: ["functional", "functional-core", "filenames-simple"],
  ignorePatterns: [
    "examples",
    "website",
  ],
  rules: {
    "@typescript-eslint/prefer-readonly": "warn",
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/strict-boolean-expressions": "error",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "(^_)|(^ESLintUtils$)",
      },
    ],
    "no-undef": "off",
    "max-depth": ["warn", 3],
    "array-callback-return": "off",
    "import-access/jsdoc": ["error"],
    "jsdoc/require-jsdoc": "off",
    "jsdoc/require-param-description": "off",
    "jsdoc/require-returns": "off",
    "filenames-simple/named-export": "off",
    "functional/no-mixed-types": "off",
    "functional/no-return-void": "off",
    "functional/functional-parameters": "off",
    "functional-core/purity": ["error", { allowThrow: false }],
    "eslint-plugin/require-meta-docs-url": "off",
    "max-len": "off",
    "newline-before-return": "warn",
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"],
      },
    ],
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
    "prefer-object-has-own": "error",
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
      },
    ],
    "regexp/no-unused-capturing-group": "off",
    "regexp/prefer-named-capture-group": "off",
    "simple-import-sort/exports": "warn",
    "simple-import-sort/imports": "warn",
    "unicorn/new-for-builtins": "off",
    "unicorn/no-keyword-prefix": "off",
    "unicorn/no-array-method-this-argument": "off",
    "unicorn/template-indent": [
      "warn",
      {
        indent: 2,
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
  overrides: [
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
        "functional/no-let": "off",
        "functional/no-return-void": "off",
        "functional/no-expression-statements": "off",
        "functional/no-conditional-statements": "off",
        "functional/immutable-data": "off",
        "functional/prefer-immutable-types": "off",
        "functional/functional-parameters": "off",
      },
    },
    {
      files: ["./packages/eslint-*/**/*"],
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
