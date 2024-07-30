import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-comment-textnodes";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<div>// invalid</div>`,
      errors: [{ messageId: "NO_COMMENT_TEXTNODES" }],
    },
    {
      code: /* tsx */ `<>// invalid</>`,
      errors: [{ messageId: "NO_COMMENT_TEXTNODES" }],
    },
    {
      code: /* tsx */ `<div>/* invalid */</div>`,
      errors: [{ messageId: "NO_COMMENT_TEXTNODES" }],
    },
    {
      code: /* tsx */ `
        <div>
        // invalid
        </div>
      `,
      errors: [{ messageId: "NO_COMMENT_TEXTNODES" }],
    },
    {
      code: /* tsx */ `
        <div>
        abcdef
        /* invalid */
        foo
        </div>
      `,
      errors: [{ messageId: "NO_COMMENT_TEXTNODES" }],
    },
    {
      code: /* tsx */ `
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
  valid: [
    ...allValid,
    "<App foo='test'>{/* valid */}</App>",
    "<strong>&nbsp;https://www.example.com/attachment/download/1</strong>",
    "<App /* valid */ placeholder={'foo'}/>",
    "</* valid */></>",
  ],
});
