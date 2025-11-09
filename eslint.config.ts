import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import {
  GLOB_CONFIGS,
  GLOB_IGNORES,
  GLOB_SCRIPTS,
  GLOB_TESTS,
  GLOB_TS,
  disableProblematicEslintJsRules,
  disableTypeChecked,
  strictTypeChecked,
} from "@local/configs/eslint";
import { nullishComparison, templateExpression } from "@local/function-rules";
import { recommended as fastImportRecommended } from "eslint-plugin-fast-import";
import { defineRule } from "eslint-plugin-function-rule";
import pluginVitest from "eslint-plugin-vitest";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const dirname = fileURLToPath(new URL(".", import.meta.url));
const gitignore = fileURLToPath(new URL(".gitignore", import.meta.url));

const packagesTsConfigs = [
  "packages/*/tsconfig.json",
  "packages/*/*/tsconfig.json",
];

export default defineConfig([
  includeIgnoreFile(gitignore, "Imported .gitignore patterns") as never,
  globalIgnores([
    ...GLOB_IGNORES,
    "apps",
    "docs",
    "test",
    "examples",
    "**/*.d.ts",
  ]),
  {
    extends: [
      tseslint.configs.strictTypeChecked,
      strictTypeChecked,
      // @ts-expect-error - types issue
      fastImportRecommended({ rootDir: dirname }),
    ],
    files: GLOB_TS,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: packagesTsConfigs,
        projectService: true,
        tsconfigRootDir: dirname,
      },
    },
    plugins: {
      "nullish-comparison": defineRule("v1", nullishComparison()),
      "template-expression": defineRule("v1", templateExpression()),

      custom: defineRule("v1", (context) => ({
        TemplateLiteral(node) {
          if (node.loc?.start.line !== node.loc?.end.line) {
            context.report({
              node,
              message: "Avoid multiline template expressions.",
            });
          }
        },
      })),
    },
    rules: {
      "fast-import/no-unused-exports": "off",
      "nullish-comparison/v1": "error",
      "template-expression/v1": "warn",
    },
  },
  {
    extends: [
      disableTypeChecked,
    ],
    files: [...GLOB_SCRIPTS, ...GLOB_CONFIGS],
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
    files: GLOB_TESTS,
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
      "nullish-comparison/v1": "off",
      "template-expression/v1": "off",
    },
  },
  disableProblematicEslintJsRules,
]);
