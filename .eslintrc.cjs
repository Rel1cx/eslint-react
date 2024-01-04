// @ts-check
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  // eslint-disable-next-line perfectionist/sort-objects
  env: {
    browser: false,
    es2024: true,
    node: true,
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
      extends: [
        "with-tsconfig",
        "plugin:perfectionist/recommended-natural",
        "plugin:functional/lite",
        "plugin:filenames-simple/recommended",
        "plugin:jsdoc/recommended-typescript",
        "plugin:eslint-plugin/all",
      ],
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        project: [
          "./tsconfig.json",
          "./packages/**/tsconfig.json",
        ],
        sourceType: "module",
        tsconfigRootDir: __dirname,
      },
      plugins: [
        "functional",
        "total-functions",
        "filenames-simple",
      ],
      rules: {
        "@susisu/safe-typescript/no-unsafe-object-property-check": "off",
        "array-callback-return": "off",
        curly: "off",
        "eslint-plugin/require-meta-docs-url": "off",
        "filenames-simple/named-export": "off",
        "filenames-simple/naming-convention": ["error", { rule: "kebab-case" }],
        "functional/functional-parameters": "off",
        "functional/no-mixed-types": "off",
        "functional/no-return-void": "off",
        "functional/prefer-immutable-types": "off",
        "import-access/jsdoc": ["error"],
        "jsdoc/require-jsdoc": "off",
        "jsdoc/require-param-description": "off",
        "jsdoc/require-returns": "off",
        "max-depth": ["warn", 3],
        "max-len": "off",
        "newline-before-return": "warn",
        "no-console": ["warn", { allow: ["warn", "error"] }],
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
        "no-undef": "off",
        "perfectionist/sort-exports": "off",
        "perfectionist/sort-imports": "off",
        "perfectionist/sort-named-exports": "off",
        "perfectionist/sort-named-imports": "off",
        "perfectionist/sort-object-types": "off",
        "perfectionist/sort-objects": [
          "warn",
          {
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
            type: "natural",
          },
        ],
        "perfectionist/sort-union-types": [
          "warn",
          {
            order: "asc",
            type: "natural",
          },
        ],
        "prefer-object-has-own": "error",
        "regexp/no-unused-capturing-group": "off",
        "regexp/prefer-named-capture-group": "off",
        "simple-import-sort/exports": "warn",
        "simple-import-sort/imports": "warn",
        "sonarjs/no-duplicate-string": "off",
        "total-functions/no-enums": "error",
        "total-functions/no-partial-array-reduce": "warn",
        "total-functions/no-partial-division": "warn",
        "total-functions/no-partial-url-constructor": "warn",
        "total-functions/require-strict-mode": "error",
        "unicorn/template-indent": ["warn", { indent: 2 }],
      },
    },
    {
      extends: [
        "plugin:functional/strict",
      ],
      files: [
        "./packages/tools/src/**/*.ts",
        "./packages/types/src/**/*.ts",
      ],
      rules: {
        "functional/functional-parameters": "off",
        "functional/no-conditional-statements": "off",
        "functional/no-mixed-types": "off",
        "functional/no-return-void": "off",
      },
    },
    {
      extends: [
        "plugin:functional/strict",
      ],
      files: [
        "./packages/utilities/**/*.ts",
      ],
      rules: {
        "functional/functional-parameters": "off",
        "functional/immutable-data": "off",
        "functional/no-conditional-statements": "off",
        "functional/no-expression-statements": "off",
        "functional/no-return-void": "off",
        "functional/prefer-immutable-types": "off",
      },
    },
    {
      extends: [
        // eslint-disable-next-line sonarjs/no-duplicate-string
        "plugin:functional/off",
      ],
      files: ["./packages/plugins/*/src/rules/**/*.ts"],
      rules: {
        "perfectionist/sort-objects": "off",
      },
    },
    {
      extends: [
        "plugin:functional/off",
      ],
      files: ["./scripts/**/*.ts"],
      globals: {
        Bun: "readonly",
      },
      rules: {
        "no-await-in-loop": "off",
      },
    },
    {
      extends: [
        "plugin:functional/off",
      ],
      files: ["./test/**/*"],
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
      files: ["./packages/**/*.config.ts"],
      rules: {
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
      },
    },
    {
      extends: [
        "with-tsconfig",
        "plugin:perfectionist/recommended-natural",
      ],
      files: [".eslintrc.cjs"],
      rules: {
        "filenames-simple/naming-convention": "off",
        // "perfectionist/sort-objects": "off",
        "functional/immutable-data": "off",
        "functional/no-expression-statements": "off",
        "jsdoc/check-tag-names": "off",
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
