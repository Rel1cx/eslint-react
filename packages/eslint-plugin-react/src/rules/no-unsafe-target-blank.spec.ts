import { allValid, defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./no-unsafe-target-blank";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});
ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    "<span></span>",
    "<a></a>",
    '<a href="https://react.dev" target="_self"></a>',
    '<a href="https://react.dev" target="_parent"></a>',
    '<Link href="https://react.dev" target="_self"></Link>',
    '<Link href="https://react.dev" target="_parent"></Link>',
    '<a href="https://react.dev" target="_blank" rel="noopener noreferrer"></a>',
    '<a href="https://react.dev" target="_blank" rel="noreferrer noopener"></a>',
    '<Link href="https://react.dev" target="_blank" rel="noopener noreferrer"></Link>',
    '<Link href="https://react.dev" target="_blank" rel={"noopener noreferrer"}></Link>',
  ],
  invalid: [
    {
      code: '<a href="https://react.dev" target="_blank"></a>',
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
    },
    {
      code: '<a href="https://react.dev" target={"_blank"}></a>',
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
    },
    {
      code: '<a href="https://react.dev" target="_blank" rel="noopener"></a>',
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
    },
    {
      code: '<a href="https://react.dev" target="_blank" rel="noreferrer"></a>',
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
    },
    {
      code: '<Link href="https://react.dev" target="_blank"></Link>',
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
    },
    {
      code: '<Link href="https://react.dev" target="_blank" rel="noopener"></Link>',
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
    },
    {
      code: '<Link href="https://react.dev" target="_blank" rel="noreferrer"></Link>',
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
    },
    {
      code: '<Link href="https://react.dev" target="_blank" rel={"noreferrer"}></Link>',
      errors: [{ messageId: "NO_UNSAFE_TARGET_BLANK" }],
    },
  ],
});
