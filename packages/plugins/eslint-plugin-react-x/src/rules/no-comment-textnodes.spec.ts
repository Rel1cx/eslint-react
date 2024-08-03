import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-comment-textnodes";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<div>// invalid</div>`,
      errors: [{ messageId: "noCommentTextnodes" }],
    },
    {
      code: /* tsx */ `<>// invalid</>`,
      errors: [{ messageId: "noCommentTextnodes" }],
    },
    {
      code: /* tsx */ `<div>/* invalid */</div>`,
      errors: [{ messageId: "noCommentTextnodes" }],
    },
    {
      code: /* tsx */ `
        <div>
        // invalid
        </div>
      `,
      errors: [{ messageId: "noCommentTextnodes" }],
    },
    {
      code: /* tsx */ `
        <div>
        abcdef
        /* invalid */
        foo
        </div>
      `,
      errors: [{ messageId: "noCommentTextnodes" }],
    },
    {
      code: /* tsx */ `
        <div>
        {'abcdef'}
        // invalid
        {'foo'}
        </div>
      `,
      errors: [{ messageId: "noCommentTextnodes" }],
    },
    {
      code: "<span>/*</span>",
      errors: [{ messageId: "noCommentTextnodes" }],
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
