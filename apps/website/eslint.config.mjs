import js from "@eslint/js";
import react from "@eslint-react/eslint-plugin";
import markdown from "@eslint/markdown";
import pluginDeMorgan from "eslint-plugin-de-morgan";
import pluginMdx from "eslint-plugin-mdx";
import pluginNext from "@next/eslint-plugin-next";
import pluginPerfectionist from "eslint-plugin-perfectionist";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import pluginReactCompiler from "eslint-plugin-react-compiler";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import pluginUnicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";
import gitignore from "eslint-config-flat-gitignore";
import TSCONFIG from "./tsconfig.json" with { type: "json" };

const GLOB_TS = ["**/*.ts", "**/*.tsx"];
const GLOB_JS = ["**/*.js", "**/*.jsx"];
const GLOB_MD = ["**/*.md"];
const GLOB_MDX = ["**/*.mdx"];
const GLOB_APP = ["app/**/*.{js,ts,jsx,tsx}"];
const GLOB_CONFIG = ["**/*.config.{js,mjs,ts,tsx}"];

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

export default tseslint.config(
  {
    files: GLOB_MD,
    extends: [
      markdown.configs.recommended,
    ],
    language: "markdown/gfm",
    rules: {
      "markdown/no-html": "error",
      "markdown/no-missing-label-refs": "off",
    },
  },
  {
    ...pluginMdx.flat,
    files: GLOB_MDX,
    processor: pluginMdx.createRemarkProcessor({
      lintCodeBlocks: false,
    }),
  },
  {
    files: GLOB_TS,
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      pluginDeMorgan.configs.recommended,
      pluginPerfectionist.configs["recommended-natural"],
    ],
    plugins: {
      "simple-import-sort": pluginSimpleImportSort,
      unicorn: pluginUnicorn,
    },
    rules: {
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
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
      "unicorn/template-indent": [
        "warn",
        {
          comments: templateIndentAnnotations,
          tags: templateIndentAnnotations,
        },
      ],
    },
  },
  {
    files: TSCONFIG.include,
    extends: [
      tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: TSCONFIG.include,
    ...react.configs["recommended-type-checked"],
  },
  pluginReactCompiler.configs.recommended,
  {
    files: TSCONFIG.include,
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: pluginReactHooks.configs.recommended.rules,
  },
  {
    files: TSCONFIG.include,
    plugins: {
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": "warn",
    },
  },
  {
    files: TSCONFIG.include,
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    files: GLOB_APP,
    rules: {
      "@typescript-eslint/require-await": "off",
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: [...GLOB_JS, ...GLOB_CONFIG],
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
      "no-undef": "off",
      "no-console": "off",
    },
  },
  gitignore(),
);
