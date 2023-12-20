import { defaultParserOptions, RuleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./filename";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

const code = "export {}";

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      filename: "PascalCase.tsx",
      code,
    },
    {
      filename: "kebab-case.tsx",
      code,
      options: ["kebab-case"],
    },
    {
      filename: "PascalCase.tsx",
      code,
      options: ["PascalCase"],
    },
    {
      filename: "camelCase.tsx",
      code,
      options: ["camelCase"],
    },
    {
      filename: "snake_case.tsx",
      code,
      options: ["snake_case"],
    },
    {
      filename: "kebab-case.tsx",
      code,
      options: [{ rule: "kebab-case" }],
    },
    {
      filename: "camelCase.tsx",
      code,
      options: [{ rule: "camelCase" }],
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
      options: ["kebab-case"],
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
