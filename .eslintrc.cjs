/** @type {import("eslint").Linter.Config} */
const config = {
    root: true,
    env: {
        browser: false,
        es2024: true,
        node: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        project: [
            "./tsconfig.json",
            "./packages/*/tsconfig.json",
            // "./plugins/*/tsconfig.json",
            // "./website/*/tsconfig.json",
        ],
        sourceType: "module",
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: false,
    },
    plugins: ["filenames-simple"],
    extends: [
        "with-tsconfig",
        "plugin:perfectionist/recommended-natural",
        "plugin:jsdoc/recommended-typescript",
        "plugin:eslint-plugin/all",
        "plugin:filenames-simple/recommended",
    ],
    rules: {
        "@typescript-eslint/prefer-readonly": "error",
        "@typescript-eslint/strict-boolean-expressions": "error",
        "array-callback-return": "off",
        "eslint-plugin/require-meta-docs-url": "off",
        "filenames-simple/named-export": "off",
        "import-access/jsdoc": ["error"],
        "jsdoc/require-jsdoc": "off",
        "jsdoc/require-param-description": "off",
        "jsdoc/require-returns": "off",
        "max-len": "off",
        "newline-before-return": "warn",
        "no-console": [
            "warn",
            {
                allow: ["warn", "error"],
            },
        ],
        "no-restricted-syntax": [
            "error",
            {
                message: "If statements with an else branch are not allowed.",
                selector: "IfStatement[alternate]",
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
                    "id",
                    "name",
                    "key",
                    "kind",
                    "meta",
                    "type",
                    "docs",
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
        "unicorn/no-array-method-this-argument": "off",
        "unicorn/template-indent": [
            "warn",
            {
                indent: 4,
            },
        ],
    },
    overrides: [
        {
            files: ["*.d.ts"],
            rules: {
                "@typescript-eslint/consistent-type-definitions": "off",
                "filenames-simple/naming-convention": "off",
            },
        },
        {
            extends: ["plugin:vitest/all"],
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
            files: ["./scripts/**/*.ts"],
            rules: {
                "no-await-in-loop": "off",
            },
        },
        {
            files: ["./packages/*/rollup.config.ts"],
            rules: {
                "@typescript-eslint/no-unsafe-argument": "off",
                "@typescript-eslint/no-unsafe-assignment": "off",
                "@typescript-eslint/no-unsafe-member-access": "off",
            },
        },
        {
            files: ["./.eslintrc.cjs"],
            rules: {
                "jsdoc/check-tag-names": "off",
                "perfectionist/sort-objects": "off",
                "filenames-simple/naming-convention": "off",
            },
        },
    ],
};

module.exports = config;
