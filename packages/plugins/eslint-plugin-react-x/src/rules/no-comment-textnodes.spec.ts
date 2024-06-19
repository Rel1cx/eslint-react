import dedent from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-comment-textnodes";

ruleTester.run(RULE_NAME, rule, {
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
  valid: [
    ...allValid,
    "<App foo='test'>{/* valid */}</App>",
    "<strong>&nbsp;https://www.example.com/attachment/download/1</strong>",
    "<App /* valid */ placeholder={'foo'}/>",
    "</* valid */></>",
  ],
});
