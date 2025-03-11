import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import pluginDeMorgan from "eslint-plugin-de-morgan";
import pluginJsdoc from "eslint-plugin-jsdoc";
import pluginPerfectionist from "eslint-plugin-perfectionist";
import pluginRegexp from "eslint-plugin-regexp";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import pluginUnicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

type ConfigArray = ReturnType<typeof tseslint.config>;

const GLOB_TS = ["*.{ts,tsx,cts,mts}", "**/*.{ts,tsx,cts,mts}"];

const templateIndentAnnotations = [
  "outdent",
  "dedent",
  "html",
  "tsx",
  "ts",
];

const p11tOptions = {
  type: "natural",
  ignoreCase: false,
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

export const typescript: ConfigArray = tseslint.config({
  extends: [
    js.configs.recommended,
    ...tseslint.configs.strict,
    pluginDeMorgan.configs.recommended,
    pluginJsdoc.configs["flat/recommended-typescript-error"],
    pluginRegexp.configs["flat/recommended"],
    pluginPerfectionist.configs["recommended-natural"],
  ],
  files: GLOB_TS,
  plugins: {
    ["@stylistic"]: stylistic,
    ["simple-import-sort"]: pluginSimpleImportSort,
    ["unicorn"]: pluginUnicorn,
  },
  rules: {
    eqeqeq: ["error", "smart"],
    "no-console": "error",
    "no-else-return": "error",
    "no-fallthrough": ["error", { commentPattern: ".*intentional fallthrough.*" }],
    "no-implicit-coercion": ["error", { allow: ["!!"] }],
    "no-mixed-operators": "warn",
    "no-undef": "off",
    "prefer-object-has-own": "error",
    // Part: custom rules
    "no-restricted-syntax": [
      "error",
      {
        message: "no optional",
        selector: "TSPropertySignature[optional=true]",
      },
    ],
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
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-misused-promises": "off",
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
    // Part: jsdoc rules
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
    // Part: simple-import-sort rules
    "simple-import-sort/exports": "warn",
    "simple-import-sort/imports": "warn",
    // Part: stylistic rules
    "@stylistic/arrow-parens": ["warn", "always"],
    "@stylistic/no-multi-spaces": ["warn"],
    "@stylistic/operator-linebreak": [
      "warn",
      "before",
    ],
    "@stylistic/quote-props": ["error", "as-needed"],
    // Part: perfectionist rules
    "perfectionist/sort-exports": "off",
    "perfectionist/sort-imports": "off",
    "perfectionist/sort-interfaces": [
      "warn",
      {
        ...p11tOptions,
        ...p11tGroups,
      },
    ],
    "perfectionist/sort-intersection-types": "off",
    "perfectionist/sort-modules": "off",
    "perfectionist/sort-named-exports": "off",
    "perfectionist/sort-named-imports": "off",
    "perfectionist/sort-object-types": [
      "warn",
      {
        ...p11tOptions,
        ...p11tGroups,
      },
    ],
    "perfectionist/sort-objects": [
      "warn",
      {
        ...p11tOptions,
        ...p11tGroups,
        partitionByComment: "^Part:.*",
      },
    ],
    "perfectionist/sort-switch-case": "off",
    "perfectionist/sort-union-types": "off",
    // Part: unicorn rules
    "unicorn/template-indent": [
      "warn",
      {
        comments: templateIndentAnnotations,
        tags: templateIndentAnnotations,
      },
    ],
  },
});
