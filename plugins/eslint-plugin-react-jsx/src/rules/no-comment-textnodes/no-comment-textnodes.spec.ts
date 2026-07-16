import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-comment-textnodes";

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
    // Empty comment block
    {
      code: tsx`<div>/**/</div>`,
      errors: [{ messageId: "default" }],
    },
    // Bare double-slash with no content
    {
      code: tsx`<div>//</div>`,
      errors: [{ messageId: "default" }],
    },
    // Comment text immediately after an expression
    {
      code: tsx`<div>{expr}// comment</div>`,
      errors: [{ messageId: "default" }],
    },
    // Comment text immediately before an expression
    {
      code: tsx`<div>// comment{expr}</div>`,
      errors: [{ messageId: "default" }],
    },
    // Inside a custom component
    {
      code: tsx`<Custom>/* not a real comment */</Custom>`,
      errors: [{ messageId: "default" }],
    },
    // Leading whitespace before comment
    {
      code: tsx`<div>   // comment</div>`,
      errors: [{ messageId: "default" }],
    },
    // Leading newline before comment
    {
      code: tsx`
        <div>
          // comment
        </div>
      `,
      errors: [{ messageId: "default" }],
    },
    // Block comment with content
    {
      code: tsx`<div>/** comment */</div>`,
      errors: [{ messageId: "default" }],
    },
    // Heuristic boundary: a line starting with '//' is reported even when it is intended text (e.g. a UNC path)
    {
      code: tsx`
        <div>
        //server/share
        </div>
      `,
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    "<App foo='test'>{/* valid */}</App>",
    "<strong>&nbsp;https://eslint-react.xyz/attachment/download/1</strong>",
    "<App /* valid */ placeholder={'foo'}/>",
    "</* valid */></>",
    // URL-like text should not be treated as comments
    "<div>https://example.com</div>",
    "<div>http://localhost:3000</div>",
    "<div>Check https://example.com</div>",
    "<div>path/to//file</div>",
    "<div>a//b</div>",
    // Inside JSX expression container (not a text node)
    tsx`
      <div>{
        // comment
      }</div>
    `,
    // Attribute value (not a text node)
    "<div attr='// comment' />",
    // Comment-like text not at the beginning of a text node
    "<div>a/*b</div>",
    "<div>a //b</div>",
    // Whitespace-only text node
    "<div>   </div>",
    tsx`
      <div>
      </div>
    `,
    // Outside of JSX entirely
    "const x = '/* not a comment */';",
    // Comment-looking string inside an expression container is not a text node
    tsx`<div>{"// not a text node"}</div>`,
  ],
});
