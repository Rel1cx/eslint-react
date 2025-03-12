import url from "node:url";

import markdown from "@eslint/markdown";
import * as configs from "@local/configs/eslint";
import pluginLocal from "@local/eslint-plugin-local";
import configFlatGitignore from "eslint-config-flat-gitignore";
import pluginVitest from "eslint-plugin-vitest";
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
const GLOB_IGNORES = [
  ...configFlatGitignore().ignores,
  ...GLOB_JS,
  "apps",
  "docs",
  "test",
  "examples",
  "**/*.d.ts",
];

const packagesTsConfigs = [
  "packages/*/tsconfig.json",
  "packages/*/*/tsconfig.json",
];

export default tseslint.config(
  { ignores: GLOB_IGNORES },
  {
    extends: [
      markdown.configs.recommended,
    ],
    files: GLOB_MD,
    ignores: [
      "**/README.md",
      "packages/**/docs/**/*.md",
    ],
    language: "markdown/gfm",
    rules: {
      "markdown/no-html": "warn",
      "markdown/no-missing-label-refs": "off",
    },
  },
  {
    extends: [
      ...tseslint.configs.strictTypeChecked,
      configs.typescript,
    ],
    files: GLOB_TS,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: packagesTsConfigs,
        projectService: true,
        tsconfigRootDir: dirname,
        // warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    plugins: {
      ["local"]: pluginLocal,
    },
    rules: {
      // Part: local rules
      "local/avoid-multiline-template-expression": "warn",
      "local/no-shadow-underscore": "error",
      "local/prefer-eqeq-nullish-comparison": "warn",
    },
  },
  {
    extends: [
      tseslint.configs.disableTypeChecked,
    ],
    files: [...GLOB_SCRIPT, ...GLOB_CONFIG],
    languageOptions: {
      parserOptions: {
        project: false,
        projectService: false,
      },
    },
    rules: {
      "no-console": "off",
    },
  },
  {
    extends: [
      pluginVitest.configs.recommended,
    ],
    files: GLOB_TEST,
    languageOptions: {
      globals: {
        ...pluginVitest.environments.env.globals,
      },
      parserOptions: {
        project: "tsconfig.json",
        projectService: true,
        tsconfigRootDir: dirname,
      },
    },
    plugins: {
      vitest: pluginVitest,
    },
    rules: {
      "@typescript-eslint/no-empty-function": ["error", { allow: ["arrowFunctions"] }],
      "local/avoid-multiline-template-expression": "off",
    },
  },
);
