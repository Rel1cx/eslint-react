import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import pluginDeMorgan from "eslint-plugin-de-morgan";
import pluginFunction from "eslint-plugin-function";
import pluginJsdoc from "eslint-plugin-jsdoc";
import pluginPerfectionist from "eslint-plugin-perfectionist";
import pluginRegexp from "eslint-plugin-regexp";
import pluginUnicorn from "eslint-plugin-unicorn";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export const GLOB_JS = ["**/*.{js,jsx,cjs,mjs}"];
export const GLOB_TS = ["**/*.{ts,tsx,cts,mts}"];
export const GLOB_MD = ["**/*.md"];
export const GLOB_TESTS = [
  "**/*{spec,test}.{ts,tsx,cts,mts}",
  "**/*(spec|test).{ts,tsx,cts,mts}",
];
export const GLOB_CONFIGS = ["**/*.config.{ts,tsx,cts,mts}"];
export const GLOB_SCRIPTS = ["scripts/**/*.{ts,cts,mts}"];
export const GLOB_IGNORES = [
  "**/node_modules",
  "**/dist",
  "**/package-lock.json",
  "**/yarn.lock",
  "**/pnpm-lock.yaml",
  "**/bun.lockb",

  "**/output",
  "**/coverage",
  "**/temp",
  "**/.temp",
  "**/tmp",
  "**/.tmp",
  "**/.history",
  "**/.vitepress/cache",
  "**/.nuxt",
  "**/.next",
  "**/.vercel",
  "**/.changeset",
  "**/.idea",
  "**/.cache",
  "**/.output",
  "**/.vite-inspect",
  "**/.yarn",
  "**/storybook-static",
  "**/.eslint-config-inspector",
  "**/playwright-report",
  "**/.astro",
  "**/.vinxi",
  "**/app.config.timestamp_*.js",
  "**/.tanstack",
  "**/.nitro",

  "**/CHANGELOG*.md",
  "**/*.min.*",
  "**/LICENSE*",
  "**/__snapshots__",
  "**/auto-import?(s).d.ts",
  "**/components.d.ts",
  "**/vite.config.ts.*.mjs",

  "**/*.gen.*",

  "!.storybook",
] as const;

const templateIndentTags = [
  "ts",
  "tsx",
  "html",
  "glsl",
  "dedent",
  "outdent",
];

const p11tOptions = {
  type: "natural",
  ignoreCase: false,
  partitionByComment: "^Part:.*",
  partitionByNewLine: true,
};

const p11tGroups = {
  customGroups: {
    id: ["^_$", "^id$", "^key$", "^self$"],
    type: ["^type$", "^kind$"],
    meta: [
      "^name$",
      "^meta$",
      "^title$",
      "^description$",
    ],
    alias: ["^alias$", "^as$"],
    rules: ["^node$", "^messageId$"],
  },
  groups: ["id", "type", "meta", "alias", "rules", "unknown"],
};

export const strictTypeChecked = defineConfig([
  {
    ignores: GLOB_JS,
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
    ],
    files: GLOB_TS,
    rules: {
      eqeqeq: ["error", "smart"],
      "no-console": "error",
      "no-else-return": "error",
      "no-fallthrough": ["error", { commentPattern: ".*intentional fallthrough.*" }],
      "no-implicit-coercion": ["error", { allow: ["!!"] }],
      "no-mixed-operators": "warn",
      "no-undef": "off",
      "prefer-object-has-own": "error",

      "no-restricted-syntax": [
        "error",
        {
          message: "no typescript named import",
          selector: "ImportDeclaration[source.value='typescript'] ImportSpecifier",
        },
      ],

      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-check": false,
          "ts-expect-error": "allow-with-description",
          "ts-ignore": true,
          "ts-nocheck": true,
        },
      ],
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-misused-promises": "warn",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unnecessary-parameter-property-assignment": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { caughtErrors: "all" }],
      "@typescript-eslint/strict-boolean-expressions": ["error", {
        allowAny: false,
        allowNullableBoolean: false,
        allowNullableEnum: false,
        allowNullableNumber: false,
        allowNullableObject: false,
        allowNullableString: false,
        allowNumber: true,
        allowString: false,
      }],
    },
  },
  {
    extends: [
      pluginDeMorgan.configs.recommended,
      pluginJsdoc.configs["flat/recommended-typescript-error"],
      pluginRegexp.configs["flat/recommended"],
      pluginPerfectionist.configs["recommended-natural"],
    ],
    files: GLOB_TS,
    plugins: {
      ["@stylistic"]: stylistic,
      ["function"]: pluginFunction,
      ["unicorn"]: pluginUnicorn,
    },
    rules: {
      "function/function-return-boolean": ["error", { pattern: "/^(is|has|can|should)/" }],

      "@stylistic/arrow-parens": ["warn", "always"],
      "@stylistic/no-multi-spaces": ["warn"],
      "@stylistic/operator-linebreak": "off",
      "@stylistic/quote-props": ["error", "as-needed"],

      "perfectionist/sort-exports": "off",
      "perfectionist/sort-imports": "off",
      "perfectionist/sort-interfaces": [
        "warn",
        { ...p11tOptions, ...p11tGroups },
      ],
      "perfectionist/sort-intersection-types": "off",
      "perfectionist/sort-modules": "off",
      "perfectionist/sort-named-exports": ["warn", { type: "natural", order: "asc" }],
      "perfectionist/sort-named-imports": ["warn", { type: "natural", order: "asc" }],
      "perfectionist/sort-object-types": [
        "warn",
        { ...p11tOptions, ...p11tGroups },
      ],
      "perfectionist/sort-objects": [
        "warn",
        { ...p11tOptions, ...p11tGroups },
      ],
      "perfectionist/sort-switch-case": "off",
      "perfectionist/sort-union-types": "off",

      "jsdoc/check-param-names": "warn",
      "jsdoc/check-tag-names": "warn",
      "jsdoc/informative-docs": "off",
      "jsdoc/lines-before-block": "off",
      "jsdoc/require-jsdoc": "off",
      "jsdoc/require-param": "warn",
      "jsdoc/require-param-description": "warn",
      "jsdoc/require-returns": "off",
      "jsdoc/require-yields": "warn",
      "jsdoc/tag-lines": "off",

      "unicorn/template-indent": [
        "warn",
        {
          comments: templateIndentTags,
          tags: templateIndentTags,
        },
      ],
    },
  },
]);

export const disableTypeChecked = defineConfig([
  {
    extends: [
      tseslint.configs.disableTypeChecked,
    ],
    rules: {
      "function/function-return-boolean": "off",
    },
  },
]);
