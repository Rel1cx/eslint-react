import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./jsx-no-comment-textnodes";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<div>// invalid</div>`,
      errors: [{ messageId: "jsxNoCommentTextnodes" }],
    },
    {
      code: tsx`<>// invalid</>`,
      errors: [{ messageId: "jsxNoCommentTextnodes" }],
    },
    {
      code: tsx`<div>/* invalid */</div>`,
      errors: [{ messageId: "jsxNoCommentTextnodes" }],
    },
    {
      code: tsx`
        <div>
        // invalid
        </div>
      `,
      errors: [{ messageId: "jsxNoCommentTextnodes" }],
    },
    {
      code: tsx`
        <div>
        abcdef
        /* invalid */
        foo
        </div>
      `,
      errors: [{ messageId: "jsxNoCommentTextnodes" }],
    },
    {
      code: tsx`
        <div>
        {'abcdef'}
        // invalid
        {'foo'}
        </div>
      `,
      errors: [{ messageId: "jsxNoCommentTextnodes" }],
    },
    {
      code: "<span>/*</span>",
      errors: [{ messageId: "jsxNoCommentTextnodes" }],
    },
  ],
  valid: [
    ...allValid,
    "<App foo='test'>{/* valid */}</App>",
    "<strong>&nbsp;https://www.eslint-react.xyz/attachment/download/1</strong>",
    "<App /* valid */ placeholder={'foo'}/>",
    "</* valid */></>",
  ],
});
