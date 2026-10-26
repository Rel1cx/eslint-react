import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./no-dangerously-set-innerhtml-with-children";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<div dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</div>`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<div dangerouslySetInnerHTML={{ __html: "HTML" }} children="Children" />`,
      errors: [{ messageId: "default" }],
    },
    // Nested element as child
    {
      code: tsx`<div dangerouslySetInnerHTML={{ __html: "HTML" }}><span /></div>`,
      errors: [{ messageId: "default" }],
    },
    // Expression container as child
    {
      code: tsx`<div dangerouslySetInnerHTML={{ __html: "HTML" }}>{value}</div>`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<App dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</App>`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<App dangerouslySetInnerHTML={{ __html: "HTML" }} children="Children" />`,
      errors: [{ messageId: "default" }],
    },
    {
      // https://github.com/Rel1cx/eslint-react/issues/1163
      code: tsx`
        function Abc() {
          return (
            <>
              {/* Error on div 1: A DOM component cannot use both children and 'dangerouslySetInnerHTML'. eslint @eslint-react/dom-no-dangerously-set-innerhtml-with-children */}
              <div dangerouslySetInnerHTML={{ __html: 'Hello World' }}>
                Goodbye World
              </div>

              {/* No error on div 2 */}
              <div dangerouslySetInnerHTML={{ __html: 'Hello World' }}>
                <p>Goodbye World</p>
              </div>
            </>
          );
        }
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      code: tsx`<App dangerouslySetInnerHTML={{ __html: "HTML" }}> </App>`,
      errors: [{ messageId: "default" }],
    },
    // Empty string expressions still produce a children value at runtime
    {
      code: '<div dangerouslySetInnerHTML={{ __html: "HTML" }}>{""}</div>',
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    "<div>Children</div>",
    '<div dangerouslySetInnerHTML={{ __html: "HTML" }} />',
    '<div children="Children" />',
    "<App>Children</App>",
    '<App dangerouslySetInnerHTML={{ __html: "HTML" }} />',
    // Spread props are not resolved
    "<div {...props} />",
    tsx`
      const props = { dangerouslySetInnerHTML: { __html: "HTML" } }
      const div = <div {...props} />
    `,
    tsx`
      const moreProps = { className: "eslint" }
      const props = { children: "Children", ...moreProps }
      const div = <div {...props} />
    `,
    tsx`
      const otherProps = { children: "Children" }
      const { a, b, ...props } = otherProps
      const div = <div {...props} />
    `,
    // Empty tag with dangerouslySetInnerHTML (no children)
    '<div dangerouslySetInnerHTML={{ __html: "HTML" }}></div>',
    '<App dangerouslySetInnerHTML={{ __html: "HTML" }}>\n</App>',
    // Comments and empty expression containers are omitted by the JSX transform
    '<div dangerouslySetInnerHTML={{ __html: "HTML" }}>{/* comment */}</div>',
    '<div dangerouslySetInnerHTML={{ __html: "HTML" }}>{}</div>',
    "<App {...undefined}>Children</App>",
  ],
});
