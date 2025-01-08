/* eslint-disable simple-import-sort/imports */
import url from "node:url";

import eslintJs from "@eslint/js";
import eslintMarkdown from "@eslint/markdown";
import eslintStylistic from "@stylistic/eslint-plugin";
import eslintPluginImport from "eslint-plugin-import-x";
import eslintPluginJsdoc from "eslint-plugin-jsdoc";
import eslintPluginLocal from "@workspace/eslint-plugin-local";
import eslintPluginPerfectionist from "eslint-plugin-perfectionist";
import eslintPluginRegexp from "eslint-plugin-regexp";
import eslintPluginSafeTypeScript from "@susisu/eslint-plugin-safe-typescript";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import eslintPluginVitest from "eslint-plugin-vitest";
// @ts-expect-error - missing types
import eslintPluginEslintPlugin from "eslint-plugin-eslint-plugin";
import eslintConfigFlatGitignore from "eslint-config-flat-gitignore";
import tseslint from "typescript-eslint";

const dirname = url.fileURLToPath(new URL(".", import.meta.url));
const GLOB_JS = ["*.{js,jsx,cjs,mjs}", "**/*.{js,jsx,cjs,mjs}"];
const GLOB_TS = ["*.{ts,tsx,cts,mts}", "**/*.{ts,tsx,cts,mts}"];
const GLOB_MD = ["*.md", "**/*.md"];
const GLOB_TEST = [
  "**/*.spec.{ts,tsx,cts,mts}",
  "**/*.test.{ts,tsx,cts,mts}",
  "**/spec.{ts,tsx,cts,mts}",
  "**/test.{ts,tsx,cts,mts}",
];
// const GLOB_YAML = ["*.{yaml,yml}", "**/*.{yaml,yml}"];
const GLOB_CONFIG = ["*.config.{ts,tsx,cts,mts}", "**/*.config.{ts,tsx,cts,mts}"];
const GLOB_SCRIPT = ["scripts/**/*.{ts,cts,mts}"];

const templateIndentAnnotations = [
  "outdent",
  "dedent",
  "html",
  "tsx",
  "ts",
];

const packagesTsConfigs = [
  "packages/*/tsconfig.json",
  "packages/*/*/tsconfig.json",
];

const rootTsConfigs = [
  "tsconfig.json",
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

const enableTypeCheckedRules = {
  ...tseslint.configs.strictTypeCheckedOnly.map(x => x.rules).reduce((a, b) => ({ ...a, ...b }), {}),
  ...eslintPluginSafeTypeScript.configs.recommended.rules,
  "@susisu/safe-typescript/no-unsafe-object-property-check": "off",
  "@susisu/safe-typescript/no-unsafe-object-property-overwrite": "off",
  "@typescript-eslint/consistent-type-exports": "error",
  "@typescript-eslint/strict-boolean-expressions": ["warn", {
    allowAny: false,
    allowNullableBoolean: true,
    allowNullableEnum: false,
    allowNullableNumber: false,
    allowNullableObject: true,
    allowNullableString: false,
    allowNumber: false,
    allowString: false,
  }],
} as const;

const disableTypeCheckedRules = Object.fromEntries(Object.keys(enableTypeCheckedRules).map(x => [x, "off"]));

export default tseslint.config(
  eslintConfigFlatGitignore(),
  {
    extends: [
      // @ts-expect-error - TODO: make types compatible
      eslintMarkdown.configs.recommended,
    ],
    files: GLOB_MD,
    ignores: [
      "packages/**/docs/**/*.md",
    ],
    language: "markdown/gfm",
    rules: {
      "markdown/no-html": "error",
      "markdown/no-missing-label-refs": "off",
    },
  },
  {
    name: "global-ignores",
    ignores: [
      "docs",
      "examples",
      "website",
      "test",
    ],
  },
  {
    files: [...GLOB_JS, ...GLOB_TS],
    // eslint-disable-next-line perfectionist/sort-objects
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.strict,
      eslintPluginImport.flatConfigs.recommended,
      eslintPluginPerfectionist.configs["recommended-natural"],
      eslintPluginRegexp.configs["flat/recommended"],
      eslintPluginJsdoc.configs["flat/recommended-typescript-error"],
      eslintPluginEslintPlugin.configs["flat/all-type-checked"],
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        allowAutomaticSingleRunInference: true,
        project: packagesTsConfigs,
        projectService: true,
        tsconfigRootDir: dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    plugins: {
      ["@stylistic"]: eslintStylistic,
      ["@susisu/safe-typescript"]: eslintPluginSafeTypeScript,
      ["local"]: eslintPluginLocal,
      ["simple-import-sort"]: eslintPluginSimpleImportSort,
      ["unicorn"]: eslintPluginUnicorn,
    },
  },
  {
    files: [...GLOB_JS, ...GLOB_TS],
    rules: {
      curly: "warn",
      eqeqeq: ["error", "always"],
      "no-console": "error",
      "no-else-return": "error",
      "no-fallthrough": ["error", { commentPattern: ".*intentional fallthrough.*" }],
      "no-implicit-coercion": ["warn", { allow: ["!!"] }],
      "no-mixed-operators": "warn",
      "no-process-exit": "error",
      "no-undef": "off",
      "one-var": ["error", "never"],
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
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-unnecessary-parameter-property-assignment": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          varsIgnorePattern: "^_",
        },
      ],
      ...enableTypeCheckedRules,
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
      "jsdoc/tag-lines": "warn",
      // Part: simple-import-sort rules
      "simple-import-sort/exports": "warn",
      "simple-import-sort/imports": "warn",
      // Part: stylistic rules
      "@stylistic/curly-newline": ["warn", "always"],
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
      "perfectionist/sort-union-types": "warn",
      // Part: unicorn rules
      "unicorn/template-indent": [
        "warn",
        {
          comments: templateIndentAnnotations,
          tags: templateIndentAnnotations,
        },
      ],
      // Part: eslint-plugin rules
      "eslint-plugin/meta-property-ordering": "off",
      "eslint-plugin/no-property-in-node": "off",
      "eslint-plugin/require-meta-docs-recommended": "off",
      "eslint-plugin/require-meta-docs-url": "off",
      // Part: local rules
      "local/avoid-multiline-template-expression": "warn",
    },
    settings: {
      "import-x/parsers": {
        "@typescript-eslint/parser": GLOB_TS,
      },
      "import-x/resolver": "oxc",
    },
  },
  {
    files: GLOB_JS,
    languageOptions: {
      parserOptions: {
        project: false,
        projectService: false,
      },
    },
    rules: {
      ...disableTypeCheckedRules,
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  {
    files: GLOB_TEST,
    languageOptions: {
      globals: {
        ...eslintPluginVitest.environments.env.globals,
      },
      parser: tseslint.parser,
      parserOptions: {
        allowAutomaticSingleRunInference: true,
        project: rootTsConfigs,
        projectService: true,
        tsconfigRootDir: dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    plugins: {
      vitest: eslintPluginVitest,
    },
    rules: {
      ...disableTypeCheckedRules,
      ...eslintPluginVitest.configs.recommended.rules,
      "@typescript-eslint/no-empty-function": ["error", { allow: ["arrowFunctions"] }],
      "import-x/no-extraneous-dependencies": "off",
      "local/avoid-multiline-template-expression": "off",
    },
  },
  {
    files: GLOB_SCRIPT,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        allowAutomaticSingleRunInference: true,
        project: rootTsConfigs,
        projectService: true,
        tsconfigRootDir: dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
  },
  {
    files: GLOB_CONFIG,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        allowAutomaticSingleRunInference: true,
        project: false,
        projectService: false,
      },
    },
    rules: {
      ...disableTypeCheckedRules,
      "import-x/no-extraneous-dependencies": "off",
    },
  },
);
