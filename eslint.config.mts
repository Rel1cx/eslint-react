import url from "node:url";

import eslint from "@eslint/js";
import gitignore from "eslint-config-flat-gitignore";
import eslintCommentsPlugin from "eslint-plugin-eslint-comments";
import eslintPluginPlugin from "eslint-plugin-eslint-plugin";
import importPlugin from "eslint-plugin-import-x";
import jsdocPlugin from "eslint-plugin-jsdoc";
import perfectionist from "eslint-plugin-perfectionist";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import unicornPlugin from "eslint-plugin-unicorn";
import vitest from "eslint-plugin-vitest";
import eslintPluginYml from "eslint-plugin-yml";
import tseslint from "typescript-eslint";
import YamlParser from "yaml-eslint-parser";

type Config = Parameters<typeof tseslint.config>[number];

const dirname = url.fileURLToPath(new URL(".", import.meta.url));

const sortOptions = {
  type: "natural",
  ignoreCase: false,
  order: "asc",
} as const;

const sortOptionsWithGroups = {
  ...sortOptions,
  customGroups: {
    id: ["_", "id", "key"],
    type: ["type", "kind"],
    meta: [
      "name",
      "meta",
      "title",
      "description",
    ],
    alias: ["alias", "as"],
  },
  groups: ["id", "type", "meta", "alias", "unknown"],
} as const;

const config: Config[] = [
  gitignore(),
  {
    ignores: [
      "docs",
      "examples",
      "website",
      "eslint.config.js",
      "eslint.config.d.ts",
      "test",
    ],
  },
  {
    // register all of the plugins up-front
    // note - intentionally uses computed syntax to make it easy to sort the keys
    plugins: {
      ["@typescript-eslint"]: tseslint.plugin,
      ["eslint-comments"]: eslintCommentsPlugin,
      ["eslint-plugin"]: eslintPluginPlugin,
      ["import-x"]: importPlugin,
      ["jsdoc"]: jsdocPlugin,
      ["simple-import-sort"]: simpleImportSortPlugin,
      ["unicorn"]: unicornPlugin,
    },
  },
  // extends ...
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  // ...tseslint.configs.strictTypeChecked,
  perfectionist.configs["recommended-natural"],
  jsdocPlugin.configs["flat/recommended-typescript-error"],
  eslintPluginPlugin.configs["flat/all-type-checked"],
  // base config
  {
    files: ["**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        allowAutomaticSingleRunInference: true,
        project: [
          "tsconfig.json",
          "packages/*/tsconfig.json",
          "packages/*/*/tsconfig.json",
        ],
        tsconfigRootDir: dirname,
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    rules: {
      // Part: eslint rules
      curly: "off",
      eqeqeq: ["error", "always"],
      "logical-assignment-operators": "error",
      "max-depth": ["warn", 3],
      "no-console": "error",
      "no-constant-binary-expression": "off", // esbuild will remove these at build time
      "no-else-return": "error",
      "no-fallthrough": ["error", { commentPattern: ".*intentional fallthrough.*" }],
      "no-mixed-operators": "error",
      "no-process-exit": "error",
      "no-restricted-syntax": [
        "error",
        {
          message: "no else",
          selector: "IfStatement[alternate]",
        },
        {
          message: "no optional",
          selector: "TSPropertySignature[optional=true]",
        },
      ],
      "no-undef": "off",
      "one-var": ["error", "never"],
      "prefer-object-has-own": "error",
      // Part: typescript-eslint rules
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          minimumDescriptionLength: 5,
          "ts-check": false,
          "ts-expect-error": "allow-with-description",
          "ts-ignore": true,
          "ts-nocheck": true,
        },
      ],
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-unnecessary-parameter-property-assignment": "warn",
      "@typescript-eslint/no-unnecessary-type-parameters": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      // Part: functional rules
      "functional/no-return-void": "off",
      // Part: jsdoc rules
      "jsdoc/check-param-names": "warn",
      "jsdoc/check-tag-names": "warn",
      "jsdoc/informative-docs": "off",
      "jsdoc/require-jsdoc": "off",
      "jsdoc/require-param": "warn",
      "jsdoc/require-param-description": "warn",
      "jsdoc/require-returns": "warn",
      "jsdoc/require-yields": "warn",
      "jsdoc/tag-lines": "warn",
      // Part: import rules
      "import-x/consistent-type-specifier-style": "warn",
      "import-x/export": "error",
      "import-x/first": "warn",
      "import-x/newline-after-import": "warn",
      "import-x/no-absolute-path": "error",
      "import-x/no-duplicates": "error",
      "import-x/no-dynamic-require": "error",
      "import-x/no-empty-named-blocks": "error",
      "import-x/no-mutable-exports": "error",
      "import-x/no-self-import": "error",
      "import-x/no-unused-modules": "error",
      // Part: simple-import-sort rules
      "simple-import-sort/exports": "warn",
      "simple-import-sort/imports": "warn",
      // Part: perfectionist rules
      "perfectionist/sort-exports": "off",
      "perfectionist/sort-imports": "off",
      "perfectionist/sort-named-exports": "off",
      "perfectionist/sort-named-imports": "off",
      "perfectionist/sort-object-types": ["warn", sortOptionsWithGroups],
      "perfectionist/sort-objects": [
        "warn",
        {
          ...sortOptionsWithGroups,
          partitionByComment: "Part:**",
        },
      ],
      "perfectionist/sort-union-types": ["warn", sortOptions],
      // Part: unicorn rules
      "unicorn/template-indent": [
        "warn",
        {
          comments: [
            "outdent",
            "dedent",
            "html",
            "tsx",
            "ts",
          ],
          tags: [
            "outdent",
            "dedent",
            "html",
            "tsx",
            "ts",
          ],
        },
      ],
      // Part: eslint-comments rules
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
      // Part: eslint-plugin rules
      "eslint-plugin/no-property-in-node": "off",
      "eslint-plugin/require-meta-docs-url": "off",
    },
    settings: {
      "import-x/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx", ".cts", ".mts"],
      },
      "import-x/resolver": "oxc",
    },
  },
  {
    extends: [tseslint.configs.disableTypeChecked],
    files: ["**/*.js"],
    rules: {
      // turn off rules that don't apply to JS code
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  {
    extends: [tseslint.configs.disableTypeChecked],
    files: [
      "**/*.spec.{ts,tsx,cts,mts}",
      "**/*.test.{ts,tsx,cts,mts}",
      "**/spec.{ts,tsx,cts,mts}",
      "**/test.{ts,tsx,cts,mts}",
    ],
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
      parser: tseslint.parser,
    },
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "@typescript-eslint/no-empty-function": ["error", { allow: ["arrowFunctions"] }],
    },
  },
  {
    extends: [tseslint.configs.disableTypeChecked],
    files: [
      "scripts/**/*.{ts,cts,mts}",
      "*.config.{ts,tsx,cts,mts}",
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: [
          "tsconfig.json",
        ],
        tsconfigRootDir: dirname,
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
  },
  {
    extends: [
      tseslint.configs.disableTypeChecked,
    ],
    files: ["*.yaml", "**/*.yaml", "*.yml", "**/*.yml"],
    ignores: [
      "pnpm-lock.yaml",
    ],
    languageOptions: {
      parser: YamlParser,
    },
    plugins: {
      yml: eslintPluginYml,
    },
    rules: {
      // Part: ESLint core rules known to cause problems with YAML
      "no-irregular-whitespace": "off",
      "no-unused-vars": "off",
      "spaced-comment": "off",
      // Part: eslint-plugin-yml rules
      "yml/block-mapping": "error",
      "yml/block-mapping-question-indicator-newline": "error",
      "yml/block-sequence": "error",
      "yml/block-sequence-hyphen-indicator-newline": "error",
      "yml/flow-mapping-curly-newline": "error",
      "yml/flow-mapping-curly-spacing": "error",
      "yml/flow-sequence-bracket-newline": "error",
      "yml/flow-sequence-bracket-spacing": "error",
      "yml/indent": "error",
      "yml/key-spacing": "error",
      "yml/no-empty-document": "error",
      "yml/no-empty-key": "error",
      "yml/no-empty-mapping-value": "error",
      "yml/no-empty-sequence-entry": "error",
      "yml/no-irregular-whitespace": "error",
      "yml/no-tab-indent": "error",
      "yml/quotes": "error",
      "yml/spaced-comment": "error",
    },
  },
];

export default tseslint.config(...config);
