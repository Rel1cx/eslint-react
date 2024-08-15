import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./filename";

const code = "export {}";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code,
      errors: [
        {
          messageId: "filenameCaseMismatchSuggestion",
          data: {
            name: "PascalCase.tsx",
            rule: "kebab-case",
            suggestion: "pascal-case.tsx",
          },
        },
      ],
      filename: "PascalCase.tsx",
      options: ["kebab-case"],
    },
    {
      code,
      errors: [
        {
          messageId: "filenameCaseMismatchSuggestion",
          data: {
            name: "camelCase.tsx",
            rule: "PascalCase",
            suggestion: "CamelCase.tsx",
          },
        },
      ],
      filename: "camelCase.tsx",
      options: [{ rule: "PascalCase" }],
    },
    {
      code,
      errors: [
        {
          messageId: "filenameCaseMismatchSuggestion",
          data: {
            name: "kebab-case.tsx",
            rule: "PascalCase",
            suggestion: "KebabCase.tsx",
          },
        },
      ],
      filename: "kebab-case.tsx",
      options: [{ rule: "PascalCase" }],
    },
    {
      code,
      errors: [
        {
          messageId: "filenameCaseMismatchSuggestion",
          data: {
            name: "snake_case.tsx",
            rule: "PascalCase",
            suggestion: "SnakeCase.tsx",
          },
        },
      ],
      filename: "snake_case.tsx",
      options: [{ rule: "PascalCase" }],
    },
    {
      code,
      errors: [
        {
          messageId: "filenameCaseMismatchSuggestion",
          data: {
            name: "PascalCase.tsx",
            rule: "camelCase",
            suggestion: "pascalCase.tsx",
          },
        },
      ],
      filename: "PascalCase.tsx",
      options: [{ rule: "camelCase" }],
    },
    {
      code,
      errors: [
        {
          messageId: "filenameCaseMismatchSuggestion",
          data: {
            name: "kebab-case.tsx",
            rule: "camelCase",
            suggestion: "kebabCase.tsx",
          },
        },
      ],
      filename: "kebab-case.tsx",
      options: [{ rule: "camelCase" }],
    },
    {
      code,
      errors: [
        {
          messageId: "filenameCaseMismatchSuggestion",
          data: {
            name: "snake_case.tsx",
            rule: "camelCase",
            suggestion: "snakeCase.tsx",
          },
        },
      ],
      filename: "snake_case.tsx",
      options: [{ rule: "camelCase" }],
    },
  ],
  valid: [
    {
      code,
      filename: "PascalCase.tsx",
    },
    {
      code,
      filename: "kebab-case.tsx",
      options: ["kebab-case"],
    },
    {
      code,
      filename: "PascalCase.tsx",
      options: ["PascalCase"],
    },
    {
      code,
      filename: "camelCase.tsx",
      options: ["camelCase"],
    },
    {
      code,
      filename: "snake_case.tsx",
      options: ["snake_case"],
    },
    {
      code,
      filename: "kebab-case.tsx",
      options: [{ rule: "kebab-case" }],
    },
    {
      code,
      filename: "camelCase.tsx",
      options: [{ rule: "camelCase" }],
    },
    {
      code,
      filename: "snake_case.tsx",
      options: [{ rule: "snake_case" }],
    },
  ],
});
