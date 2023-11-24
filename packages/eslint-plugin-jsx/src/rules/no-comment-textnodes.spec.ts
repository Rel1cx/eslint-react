import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./no-comment-textnodes";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    "<App foo='test'>{/* valid */}</App>",
    "<strong>&nbsp;https://www.example.com/attachment/download/1</strong>",
    "<App /* valid */ placeholder={'foo'}/>",
    "</* valid */></>",
  ],
  invalid: [
    {
      code: "<div>// invalid</div>",
      errors: [{ messageId: "NO_COMMENT_TEXTNODES" }],
    },
    {
      code: "<>// invalid</>",
      errors: [{ messageId: "NO_COMMENT_TEXTNODES" }],
    },
    {
      code: "<div>/* invalid */</div>",
      errors: [{ messageId: "NO_COMMENT_TEXTNODES" }],
    },
    {
      code: dedent`
        <div>
        // invalid
        </div>
      `,
      errors: [{ messageId: "NO_COMMENT_TEXTNODES" }],
    },
    {
      code: dedent`
        <div>
        abcdef
        /* invalid */
        foo
        </div>
      `,
      errors: [{ messageId: "NO_COMMENT_TEXTNODES" }],
    },
    {
      code: dedent`
        <div>
        {'abcdef'}
        // invalid
        {'foo'}
        </div>
      `,
      errors: [{ messageId: "NO_COMMENT_TEXTNODES" }],
    },
    {
      code: "<span>/*</span>",
      errors: [{ messageId: "NO_COMMENT_TEXTNODES" }],
    },
  ],
});
