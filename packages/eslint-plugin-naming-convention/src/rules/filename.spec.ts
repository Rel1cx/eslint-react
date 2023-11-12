import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./filename";

const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: rootDir,
  },
});

const code = "export {}";

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      filename: "kebab-case.tsx",
      code,
    },
    {
      filename: "PascalCase.tsx",
      code,
      options: [{ rule: "PascalCase" }],
    },
    {
      filename: "camelCase.tsx",
      code,
      options: [{ rule: "camelCase" }],
    },
    {
      filename: "kebab-case.tsx",
      code,
      options: [{ rule: "kebab-case" }],
    },
    {
      filename: "snake_case.tsx",
      code,
      options: [{ rule: "snake_case" }],
    },
  ],
  invalid: [
    {
      filename: "PascalCase.tsx",
      code,
      errors: [
        {
          messageId: "FILENAME_CASE_MISMATCH_SUGGESTION",
          data: {
            name: "PascalCase.tsx",
            rule: "kebab-case",
            suggestion: "pascal-case.tsx",
          },
        },
      ],
    },
    {
      filename: "camelCase.tsx",
      code,
      options: [{ rule: "PascalCase" }],
      errors: [
        {
          messageId: "FILENAME_CASE_MISMATCH_SUGGESTION",
          data: {
            name: "camelCase.tsx",
            rule: "PascalCase",
            suggestion: "CamelCase.tsx",
          },
        },
      ],
    },
    {
      filename: "kebab-case.tsx",
      code,
      options: [{ rule: "PascalCase" }],
      errors: [
        {
          messageId: "FILENAME_CASE_MISMATCH_SUGGESTION",
          data: {
            name: "kebab-case.tsx",
            rule: "PascalCase",
            suggestion: "KebabCase.tsx",
          },
        },
      ],
    },
    {
      filename: "snake_case.tsx",
      code,
      options: [{ rule: "PascalCase" }],
      errors: [
        {
          messageId: "FILENAME_CASE_MISMATCH_SUGGESTION",
          data: {
            name: "snake_case.tsx",
            rule: "PascalCase",
            suggestion: "SnakeCase.tsx",
          },
        },
      ],
    },
    {
      filename: "PascalCase.tsx",
      code,
      options: [{ rule: "camelCase" }],
      errors: [
        {
          messageId: "FILENAME_CASE_MISMATCH_SUGGESTION",
          data: {
            name: "PascalCase.tsx",
            rule: "camelCase",
            suggestion: "pascalCase.tsx",
          },
        },
      ],
    },
    {
      filename: "kebab-case.tsx",
      code,
      options: [{ rule: "camelCase" }],
      errors: [
        {
          messageId: "FILENAME_CASE_MISMATCH_SUGGESTION",
          data: {
            name: "kebab-case.tsx",
            rule: "camelCase",
            suggestion: "kebabCase.tsx",
          },
        },
      ],
    },
    {
      filename: "snake_case.tsx",
      code,
      options: [{ rule: "camelCase" }],
      errors: [
        {
          messageId: "FILENAME_CASE_MISMATCH_SUGGESTION",
          data: {
            name: "snake_case.tsx",
            rule: "camelCase",
            suggestion: "snakeCase.tsx",
          },
        },
      ],
    },
  ],
});
