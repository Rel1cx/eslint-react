import { ruleTester } from "../../../../test";
import rule, { RULE_NAME } from "./prefer-eqeq-nullish-comparison";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: "something === undefined;",
      errors: [
        {
          messageId: "unexpectedComparison",
          column: 11,
          data: {
            nullishKind: "undefined",
            strictOperator: "===",
          },
          endColumn: 24,
          endLine: 1,
          line: 1,
          suggestions: [
            {
              messageId: "useLooseComparisonSuggestion",
              data: {
                looseOperator: "==",
              },
              output: `something == null;`,
            },
          ],
        },
      ],
    },
    {
      code: "undefined !== something;",
      errors: [
        {
          messageId: "unexpectedComparison",
          column: 1,
          data: {
            nullishKind: "undefined",
            strictOperator: "!==",
          },
          endColumn: 14,
          endLine: 1,
          line: 1,
          suggestions: [
            {
              messageId: "useLooseComparisonSuggestion",
              data: {
                looseOperator: "!=",
              },
              output: `null != something;`,
            },
          ],
        },
      ],
    },
    {
      code: "null !== something;",
      errors: [
        {
          messageId: "unexpectedComparison",
          column: 1,
          data: {
            nullishKind: "null",
            strictOperator: "!==",
          },
          endColumn: 9,
          endLine: 1,
          line: 1,
          suggestions: [
            {
              messageId: "useLooseComparisonSuggestion",
              data: {
                looseOperator: "!=",
              },
              output: `null != something;`,
            },
          ],
        },
      ],
    },
  ],
  valid: [
    "null == a;",
    "foo != null;",
    "foo === bar;",
    "foo !== bar;",
    // We're not trying to duplicate eqeqeq's reports.
    "a == b;",
    "something == undefined;",
    "undefined != something;",
  ],
});
