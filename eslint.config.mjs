// @ts-check

import url from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import eslintCommentsPlugin from "eslint-plugin-eslint-comments";
import eslintPluginPlugin from "eslint-plugin-eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";
import perfectionistNatural from "eslint-plugin-perfectionist/configs/recommended-natural";
import jsdocPlugin from "eslint-plugin-jsdoc";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";
import gitignore from "eslint-config-flat-gitignore";

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
        cacheLifetime: {
          // we pretty well never create/change tsconfig structure - so no need to ever evict the cache
          // in the rare case that we do - just need to manually restart their IDE.
          glob: "Infinity",
        },
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
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", disallowTypeAnnotations: true },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "no-constant-condition": "off",
      "@typescript-eslint/no-unnecessary-condition": [
        "error",
        { allowConstantLoopConditions: true },
      ],
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/prefer-literal-enum-member": [
        "error",
        {
          allowBitwiseExpressions: true,
        },
      ],
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
          allowBoolean: true,
          allowAny: true,
          allowNullish: true,
          allowRegExp: true,
        },
      ],
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

      //
      // eslint-base
      //

      eqeqeq: [
        "error",
        "always",
      ],
      "logical-assignment-operators": "error",
      "no-else-return": "error",
      "no-mixed-operators": "error",
      "no-console": "error",
      "no-process-exit": "error",
      "no-fallthrough": [
        "error",
        { commentPattern: ".*intentional fallthrough.*" },
      ],
      "one-var": ["error", "never"],
      "array-callback-return": "off",
      curly: "off",
      "eslint-plugin/require-meta-docs-url": "off",
      "max-depth": ["warn", 3],
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
      "prefer-object-has-own": "error",

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

      //
      // eslint-plugin-eslint-comment
      //

      // require a eslint-enable comment for every eslint-disable comment
      "eslint-comments/disable-enable-pair": [
        "error",
        {
          allowWholeFile: true,
        },
      ],
      // disallow a eslint-enable comment for multiple eslint-disable comments
      "eslint-comments/no-aggregating-enable": "error",
      // disallow duplicate eslint-disable comments
      "eslint-comments/no-duplicate-disable": "error",
      // disallow eslint-disable comments without rule names
      "eslint-comments/no-unlimited-disable": "error",
      // disallow unused eslint-disable comments
      "eslint-comments/no-unused-disable": "error",
      // disallow unused eslint-enable comments
      "eslint-comments/no-unused-enable": "error",
      // disallow ESLint directive-comments
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

      // enforce a sort order across the codebase
      "simple-import-sort/imports": "error",

      //
      // eslint-plugin-jsdoc
      //

      "jsdoc/check-tag-names": "off",
      "jsdoc/check-param-names": "off",
      "jsdoc/require-jsdoc": "off",
      "jsdoc/require-param": "off",
      "jsdoc/require-param-description": "off",
      "jsdoc/require-returns": "off",
      "jsdoc/require-yields": "off",
      "jsdoc/tag-lines": "off",
      // "jsdoc/informative-docs": "error",
    },
  },
  {
    files: ["**/*.js"],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      // turn off other type-aware rules
      "deprecation/deprecation": "off",
      "@typescript-eslint/internal/no-poorly-typed-ts-props": "off",

      // turn off rules that don't apply to JS code
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
  // test file specific configuration
  {
    files: [
      "packages/*/tests/**/*.spec.{ts,tsx,cts,mts}",
      "packages/*/tests/**/*.test.{ts,tsx,cts,mts}",
      "packages/*/tests/**/spec.{ts,tsx,cts,mts}",
      "packages/*/tests/**/test.{ts,tsx,cts,mts}",
      "packages/parser/tests/**/*.{ts,tsx,cts,mts}",
      "packages/integration-tests/tools/integration-test-base.ts",
      "packages/integration-tests/tools/pack-packages.ts",
    ],
    rules: {
      "@typescript-eslint/no-empty-function": [
        "error",
        { allow: ["arrowFunctions"] },
      ],
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },
  //
  // tools and tests
  //
  {
    files: [
      "**/tools/**/*.{ts,tsx,cts,mts}",
      "**/tests/**/*.{ts,tsx,cts,mts}",
    ],
    rules: {
      // allow console logs in tools and tests
      "no-console": "off",
    },
  },
  gitignore(),
  {
    ignores: [
      "eslint.config.mjs",
      "docs",
      "examples",
      "website",
    ],
  },
);
