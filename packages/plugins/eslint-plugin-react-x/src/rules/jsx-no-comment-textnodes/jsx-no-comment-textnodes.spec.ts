import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./jsx-no-comment-textnodes";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<div>// invalid</div>`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<>// invalid</>`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<div>/* invalid */</div>`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        <div>
        // invalid
        </div>
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        <div>
        abcdef
        /* invalid */
        foo
        </div>
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        <div>
        {'abcdef'}
        // invalid
        {'foo'}
        </div>
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: "<span>/*</span>",
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    "<App foo='test'>{/* valid */}</App>",
    "<strong>&nbsp;https://www.eslint-react.xyz/attachment/download/1</strong>",
    "<App /* valid */ placeholder={'foo'}/>",
    "</* valid */></>",
  ],
});
