import { includeIgnoreFile } from "@eslint/compat";
import stylistic from "@stylistic/eslint-plugin";
import type { Linter } from "eslint";
import pluginDeMorgan from "eslint-plugin-de-morgan";
import pluginFunction from "eslint-plugin-function";
import { jsdoc } from "eslint-plugin-jsdoc";
import pluginPerfectionist from "eslint-plugin-perfectionist";
import pluginRegexp from "eslint-plugin-regexp";
import pluginUnicorn from "eslint-plugin-unicorn";
import { type Config, defineConfig, globalIgnores } from "eslint/config";
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
  customGroups: [
    {
      elementNamePattern: "^(_$|id$|key$|self$)",
      groupName: "id",
    },
    {
      elementNamePattern: "^(type$|kind$)",
      groupName: "type",
    },
    {
      elementNamePattern: "^(name$|meta$|title$|description$)",
      groupName: "meta",
    },
  ],
  groups: ["id", "type", "meta", "unknown"],
};

export function buildIgnoreConfig(gitignore: string, extra: string[]) {
  return [
    includeIgnoreFile(gitignore) as Config,
    globalIgnores([
      ...GLOB_IGNORES,
      ...extra,
    ]),
  ] as const;
}

export const strictTypeChecked: Linter.Config[] = defineConfig(
  { ignores: GLOB_JS },
  {
    files: GLOB_TS,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: false,
        projectService: false,
      },
    },
    rules: {
      eqeqeq: ["error", "smart"],
      "no-console": "error",
      "no-else-return": "error",
      "no-fallthrough": ["error", { commentPattern: ".*intentional fallthrough.*" }],
      "no-implicit-coercion": ["error", { allow: ["!!"] }],
      "no-restricted-syntax": [
        "error",
        {
          message: "no typescript named import",
          selector: "ImportDeclaration[source.value='typescript'] ImportSpecifier",
        },
      ],
      "prefer-object-has-own": "error",
    },
  },
  {
    extends: [
      jsdoc({ config: "flat/recommended-typescript-error" }),
      pluginDeMorgan.configs.recommended,
      pluginPerfectionist.configs["recommended-natural"],
      pluginRegexp.configs["flat/recommended"],
    ] as never,
    files: GLOB_TS,
    plugins: {
      ["@stylistic"]: stylistic,
      ["function"]: pluginFunction,
      ["unicorn"]: pluginUnicorn,
    },
    rules: {
      "@stylistic/arrow-parens": ["warn", "always"],
      "@stylistic/no-multi-spaces": ["warn"],
      "@stylistic/operator-linebreak": "off",
      "@stylistic/quote-props": ["error", "as-needed"],

      "perfectionist/sort-array-includes": "off",
      "perfectionist/sort-exports": "off",
      "perfectionist/sort-imports": "off",
      "perfectionist/sort-interfaces": [
        "warn",
        { ...p11tOptions, ...p11tGroups },
      ],
      "perfectionist/sort-intersection-types": "off",
      "perfectionist/sort-modules": "off",
      "perfectionist/sort-named-exports": "off",
      "perfectionist/sort-named-imports": "off",
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
);

export const disableTypeChecked: Linter.Config[] = defineConfig(
  {
    extends: [
      tseslint.configs.disableTypeChecked,
    ],
    rules: {},
  },
);

/**
 * Common ESLint JS rules to disable that are problematic when using TypeScript.
 */
export const disableProblematicEslintJsRules: Linter.Config = {
  rules: {
    "no-dupe-args": "off",
    "no-unused-vars": "off",
  },
};
