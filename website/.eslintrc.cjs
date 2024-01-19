// @ts-check
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  // eslint-disable-next-line perfectionist/sort-objects
  env: {
    browser: true,
    es2024: true,
    node: true,
  },
  extends: [
    "with-tsconfig",
    "next",
    "next/core-web-vitals",
  ],
  overrides: [
    {
      extends: [
        // Using all preset here because we also use it for testing purposes, not recommended for normal projects
        "plugin:@eslint-react/all-legacy",
      ],
      files: ["*.ts", "*.tsx"],
      rules: {
        "@eslint-react/naming-convention/filename": ["warn", "kebab-case"],
        "prefer-arrow-callback": "off",
      },
    },
    {
      files: ["*.d.ts"],
      rules: {
        "spaced-comment": "off",
      },
    },
    {
      extends: ["plugin:mdx/recommended"],
      files: ["*.mdx"],
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
  ],
  rules: {
    curly: "off",
    "unicorn/new-for-builtins": "off",
    "unicorn/no-array-method-this-argument": "off",
    "unicorn/no-keyword-prefix": "off",
    "unicorn/template-indent": [
      "warn",
      {
        indent: 2,
      },
    ],
  },
});
